fetch('../components/header.html')
.then(response => response.text())
.then(html => {
    document.head.innerHTML = html;
});

fetch('../components/navbar.html')
.then(response => response.text())
.then(html => {
    document.getElementById('custom-nav').innerHTML = html;
});

fetch('../components/footer.html')
.then(response => response.text())
.then(html => {
    document.getElementById('custom-footer').innerHTML = html;
});