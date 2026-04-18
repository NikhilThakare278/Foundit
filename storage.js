const STORAGE_KEY = 'foundit_items';

const Storage = {
    getItems: () => {
        const items = localStorage.getItem(STORAGE_KEY);
        return items ? JSON.parse(items) : [];
    },

    saveItem: (item) => {
        const items = Storage.getItems();
        const newItem = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...item
        };
        items.unshift(newItem); // Add to beginning
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        return newItem;
    },

    deleteItem: (id) => {
        const items = Storage.getItems();
        const filteredItems = items.filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
    },

    getLostItems: () => {
        return Storage.getItems().filter(item => item.type === 'lost');
    },

    getFoundItems: () => {
        return Storage.getItems().filter(item => item.type === 'found');
    },

    getRecentItems: (count = 4) => {
        return Storage.getItems().slice(0, count);
    }
};

// Seed initial data if empty
if (Storage.getItems().length === 0) {
    const initialData = [
        {
            id: '1',
            name: 'Blue Water Bottle',
            description: 'HydroFlask, 32oz, some scratches at the bottom.',
            category: 'Others',
            location: 'Main Library - Floor 2',
            date: '2024-04-15',
            image: 'https://images.unsplash.com/photo-1602143307185-84e69850111d?q=80&w=400',
            type: 'lost',
            status: 'lost',
            contact: 'john.doe@college.edu'
        },
        {
            id: '2',
            name: 'Student ID Card',
            description: 'Name: Jane Smith, ID: 12345678.',
            category: 'ID Cards',
            location: 'Student Center Cafe',
            date: '2024-04-16',
            image: 'https://images.unsplash.com/photo-1610411333333-66f81e1e779a?q=80&w=400',
            type: 'found',
            status: 'found',
            finder: 'Alice Johnson'
        },
        {
            id: '3',
            name: 'iPhone 13 Pro',
            description: 'Graphite color, clear case with a stickers.',
            category: 'Electronics',
            location: 'Gymnasium - Locker Area',
            date: '2024-04-17',
            image: 'https://images.unsplash.com/photo-1633113088488-518204680879?q=80&w=400',
            type: 'lost',
            status: 'lost',
            contact: 'mike.ross@college.edu'
        }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
}

export default Storage;
