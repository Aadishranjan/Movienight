document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.side-menu li');
    const contentItems = document.querySelectorAll('.content-item');

    menuItems.forEach(menuItem => {
        menuItem.addEventListener('click', function () {
            const target = this.getAttribute('data-target');
            contentItems.forEach(item => {
                item.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });

    // Set the default active content
    document.getElementById('dashboard').classList.add('active');
});
