document.getElementById('storyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = {
    name: document.getElementById('authorName').value,
    location: document.getElementById('location').value,
    event: document.getElementById('climateEvent').value,
    story: document.getElementById('storyText').value
  };

  fetch('http://localhost:3000/api/stories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(data => alert(data.message))
  .catch(err => console.error(err));
});