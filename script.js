const API_URL = "http://localhost:5000/api";

let campusPosts = [];
let interestCounter = 0;

const postContainer = document.getElementById("postContainer");
const listingCount = document.getElementById("countListings");
const interestedCount = document.getElementById("countInterested");

async function loadListings() {
  try {
    const response = await fetch(`${API_URL}/listings`);
    campusPosts = await response.json();
    renderPosts(campusPosts);
  } catch (error) {
    alert("Could not load listings from backend.");
  }
}

function renderPosts(postsToShow) {
  postContainer.innerHTML = "";

  if (postsToShow.length === 0) {
    postContainer.innerHTML = `
      <div class="trade-card">
        <h3>No listings found</h3>
        <p>No approved listings are available yet.</p>
      </div>
    `;
    listingCount.textContent = 0;
    return;
  }

  postsToShow.forEach((post) => {
    const card = document.createElement("article");
    card.className = "trade-card";

    card.innerHTML = `
      <div class="card-top">
        <span class="type-pill">${post.category}</span>
        <span class="status-pill">${post.status || "Available"}</span>
      </div>

      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <p class="owner-text">Posted by: ${post.owner_name || "Student"}</p>

      <button onclick="markInterest(${post.id})">Request / Interested</button>
    `;

    postContainer.appendChild(card);
  });

  listingCount.textContent = postsToShow.length;
}

async function applySearch() {
  const keyword = document.getElementById("keywordBox").value.toLowerCase();
  const type = document.getElementById("typeBox").value;
  const status = document.getElementById("statusBox").value;

  const filteredPosts = campusPosts.filter((post) => {
    const keywordMatch =
      post.title.toLowerCase().includes(keyword) ||
      post.description.toLowerCase().includes(keyword) ||
      (post.owner_name || "").toLowerCase().includes(keyword);

    const typeMatch = type === "All" || post.category === type;
    const statusMatch = status === "All" || post.status === status;

    return keywordMatch && typeMatch && statusMatch;
  });

  renderPosts(filteredPosts);
}

async function registerUser() {
  const full_name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const skills_offered = document.getElementById("registerSkillsOffered").value.trim();
  const skills_needed = document.getElementById("registerSkillsNeeded").value.trim();

  if (!full_name || !email || !password) {
    alert("Please enter name, email, and password.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        full_name,
        email,
        password,
        skills_offered,
        skills_needed
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed.");
      return;
    }

    alert("Registration successful. You can now login.");
  } catch (error) {
    alert("Could not connect to backend.");
  }
}

async function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Login failed.");
      return;
    }

    localStorage.setItem("token", data.token);
    alert("Login successful.");
  } catch (error) {
    alert("Could not connect to backend.");
  }
}

async function submitPost() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login before creating a listing.");
    return;
  }

  const title = document.getElementById("newTitle").value.trim();
  const description = document.getElementById("newDescription").value.trim();
  const category = document.getElementById("newCategory").value;
  const status = document.getElementById("newStatus").value;

  if (!title || !description || !category) {
    alert("Please complete the title, description, and category.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/listings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        category,
        status
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Could not create listing.");
      return;
    }

    document.getElementById("newTitle").value = "";
    document.getElementById("newDescription").value = "";
    document.getElementById("newCategory").value = "";
    document.getElementById("newStatus").value = "Available";

    alert("Listing submitted. Admin approval is required before it appears publicly.");
  } catch (error) {
    alert("Could not connect to backend.");
  }
}

async function markInterest(listingId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login before showing interest.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/listings/${listingId}/interested`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        message: "I am interested in this listing."
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Could not send interest request.");
      return;
    }

    interestCounter++;
    interestedCount.textContent = interestCounter;
    alert("Interest request sent successfully.");
  } catch (error) {
    alert("Could not connect to backend.");
  }
}

loadListings();