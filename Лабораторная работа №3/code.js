
document.addEventListener('DOMContentLoaded', () => {
    let contactList = document.querySelector('table tr:nth-child(2) td:nth-child(3) ul');

    if (!contactList) {
        console.error('Список контактов не найден. Проверьте селектор.');
        return;
    }

    const bulletTypes = ['disc', 'circle', 'square']; 
    const numberTypes = ['decimal', 'upper-roman', 'upper-alpha']; 
    let currentBulletIndex = 0;
    let currentNumberIndex = 0;

    contactList.style.listStyleType = 'disc';

    
    contactList.addEventListener('click', (event) => {
        if (event.button === 0) {
            const items = Array.from(contactList.children); 
            if (items.length > 1) { 
                const headerItem = items[0];
                const movableItems = items.slice(1); 

                if (movableItems.length > 1) {
                    const firstMovable = movableItems.shift(); 
                    movableItems.push(firstMovable); 

                    contactList.innerHTML = ''; 
                    contactList.appendChild(headerItem); 
                    movableItems.forEach(item => contactList.appendChild(item)); 
                }
            }
        }
    });

    contactList.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        const currentTag = contactList.tagName; 
        let newList; 

        if (currentTag === 'UL') {
            newList = document.createElement('ol');
        } else { 
            newList = document.createElement('ul');
        }

        while (contactList.firstChild) {
            newList.appendChild(contactList.firstChild);
        }

        contactList.parentNode.replaceChild(newList, contactList);
        contactList = newList; 

        if (contactList.tagName === 'UL') {
            currentBulletIndex = 0; 
            contactList.style.listStyleType = bulletTypes[currentBulletIndex];
        } else {
            currentNumberIndex = 0; 
            contactList.style.listStyleType = numberTypes[currentNumberIndex];
        }

    });

    contactList.addEventListener('dblclick', (event) => {
        if (event.button === 0) {
            const currentTag = contactList.tagName;

            if (currentTag === 'UL') {
                currentBulletIndex = (currentBulletIndex + 1) % bulletTypes.length;
                contactList.style.listStyleType = bulletTypes[currentBulletIndex];
            } else { // currentTag === 'OL'
                currentNumberIndex = (currentNumberIndex + 1) % numberTypes.length;
                contactList.style.listStyleType = numberTypes[currentNumberIndex];
            }
        }
    });

    if (contactList.firstElementChild) {
         contactList.firstElementChild.style.listStyleType = 'none';
    }

});
