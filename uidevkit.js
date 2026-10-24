
        const searchInput = document.getElementById('searchInput');
        const categorySelect = document.getElementById('categorySelect');
        const searchGroup = document.getElementById('searchGroup');
        const componentGrid = document.getElementById('componentGrid');
        const componentCards = document.querySelectorAll('.component-card');
        const filterStatus = document.getElementById('filterStatus');
        const activeTagBadge = document.getElementById('activeTagBadge');
        const currentFilterText = document.getElementById('currentFilterText');
        const noResults = document.getElementById('noResults');



// fetch("E:/Project/Git Project/Web Content/category.json")
//     .then(res => res.json())
//     .then(data => {
//         document.getElementById("categorySelect").innerHTML +=
//             data.map(x =>
//                 `<option value="${x.value}">${x.text}</option>`
//             ).join("");
//     });

//---------------------------------------------

// const route = "floating-textbox";

// fetch("components.json")
//     .then(res => res.json())
//     .then(data => {
//         const component = data.find(x => x.routeName === route);

//         console.log(component.title);
//         console.log(component.description);
//     });

        // Focus expansion effect
        searchInput.addEventListener('focus', () => {
            searchInput.classList.add('active-expand');
            searchGroup.classList.add('expanded');
        });



        document.addEventListener('click', (e) => {
            if (!searchGroup.contains(e.target) && searchInput.value.trim() === '') {
                searchInput.classList.remove('active-expand');
                searchGroup.classList.remove('expanded');
            }
        });



        // Filtering Logic
        function filterComponents() {
            const query = searchInput.value.toLowerCase().trim();
            const selectedCategory = categorySelect.value;
            let matchCount = 0;



            componentCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const name = card.getAttribute('data-name');
                const textContent = card.innerText.toLowerCase();



                const matchesCategory = (selectedCategory === 'all' || category === selectedCategory);
                const matchesSearch = (query === '' || textContent.includes(query) || name.includes(query));



                if (matchesCategory && matchesSearch) {
                    card.style.display = 'block';
                    matchCount++;
                } else {
                    card.style.display = 'none';
                }
            });



            // Update Status and Badges
            if (selectedCategory !== 'all' || query !== '') {
                activeTagBadge.style.display = 'inline-flex';
                currentFilterText.textContent = selectedCategory !== 'all' ? selectedCategory : `search: "${query}"`;
                filterStatus.textContent = `Found ${matchCount} matching component(s).`;
            } else {
                activeTagBadge.style.display = 'none';
                filterStatus.textContent = 'Showing all components across 10 categories.';
            }



            if (matchCount === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }



        searchInput.addEventListener('input', filterComponents);
        categorySelect.addEventListener('change', filterComponents);



        function resetFilters() {
            searchInput.value = '';
            categorySelect.value = 'all';
            filterComponents();
        }
  