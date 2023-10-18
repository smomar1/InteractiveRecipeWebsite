document.addEventListener("DOMContentLoaded", function() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const form = document.querySelector('.submit-recipe form');
    let currentTheme = 'fall';

    themeToggleBtn.addEventListener('click', function() {
        if (currentTheme === 'fall') {
            document.body.classList.add('spring-theme');
            currentTheme = 'spring';
        } else {
            document.body.classList.remove('spring-theme');
            currentTheme = 'fall';
        }
    });

    function bindCardEventListener(card) {
        card.addEventListener('click', function() {
            const description = card.querySelector('.description');
            if (description.style.display === 'none' || description.style.display === '') {
                description.style.display = 'block';
            } else {
                description.style.display = 'none';
            }
        });
    }

    // Bind event listeners to initially loaded recipe cards
    const initialRecipeCards = document.querySelectorAll('.recipe-display article');
    initialRecipeCards.forEach(bindCardEventListener);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = e.target.recipeName.value;
        const description = e.target.recipeDescription.value;
        const imageFile = e.target.recipeImage.files[0];

        // Validation
        const pattern = /^[A-Za-z\s]+$/; // Only alphabets for the recipe name
        if (!pattern.test(name)) {
            alert('Only alphabets allowed in the recipe name!');
            return;
        }

        const newArticle = document.createElement('article');
        const img = document.createElement('img');
        const p = document.createElement('p');
        const div = document.createElement('div');

        p.innerText = name;
        div.classList.add('description');
        div.innerText = description;

        // If an image is provided
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = function() {
                img.src = reader.result;
                newArticle.appendChild(img); // Append image first
                newArticle.appendChild(p);   // Append name after the image
                newArticle.appendChild(div);
                bindCardEventListener(newArticle);
                document.querySelector('.recipe-display').appendChild(newArticle);
            }
        } else {
            newArticle.appendChild(img);  // Append image first if no image file provided
            newArticle.appendChild(p);    // Append name after the image
            newArticle.appendChild(div);
            bindCardEventListener(newArticle);
            document.querySelector('.recipe-display').appendChild(newArticle);
        }
    });
});
