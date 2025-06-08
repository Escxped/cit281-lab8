const list = document.getElementById("photo-list");
const details = document.getElementById("photo-details");

fetch('/photos')
  .then(res => res.json())
  .then(data => {
    data.forEach(photo => {
      const li = document.createElement("li");
      li.textContent = photo.title;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => showDetails(photo.id));
      list.appendChild(li);
    });
  });

function showDetails(id) {
  fetch(`/photos/${id}`)
    .then(res => res.json())
    .then(photo => {
      details.innerHTML = `
        <h2>${photo.title}</h2>
        <p><strong>ID:</strong> ${photo.id}</p>
        <p><strong>Album ID:</strong> ${photo.albumId}</p>
        <p><strong>URL:</strong> <a href="${photo.url}" target="_blank">${photo.url}</a></p>
        <p><strong>Thumbnail:</strong> <a href="${photo.thumbnailUrl}" target="_blank">${photo.thumbnailUrl}</a></p>
      `;
    })
    .catch(error => {
      details.innerHTML = `<p style="color:red;">Error loading photo details.</p>`;
      console.error("Photo fetch error:", error);
    });
}
