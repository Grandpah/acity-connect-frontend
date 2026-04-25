let interestCounter = 0;

let campusPosts = [
  {
    title: "Engineering Drawing Set",
    description: "Complete drawing set with T-square, compass, ruler, and clean drawing board.",
    category: "Item",
    status: "Available",
    owner: "Adewunmi"
  },
  {
    title: "Frontend Project Help",
    description: "I can help students with HTML, CSS, JavaScript layout issues and project structure.",
    category: "Skill",
    status: "Available",
    owner: "Nana"
  },
  {
    title: "Pre-owned Headphones",
    description: "Good sound quality, clean condition, useful for online lectures and study sessions.",
    category: "Item",
    status: "Available",
    owner: "Kelvin"
  },
  {
    title: "Mathematics Peer Tutoring",
    description: "Available to explain calculus, limits, functions, and basic statistics.",
    category: "Skill",
    status: "Swapped",
    owner: "Akosua"
  },
  {
    title: "Laptop Stand",
    description: "Adjustable laptop stand for better posture while coding or studying.",
    category: "Item",
    status: "Sold",
    owner: "Jason"
  }
];

const postContainer = document.getElementById("postContainer");
const listingCount = document.getElementById("countListings");
const interestedCount = document.getElementById("countInterested");

function renderPosts(postsToShow) {
  postContainer.innerHTML = "";

  if (postsToShow.length === 0) {
    postContainer.innerHTML = `
      <div class="trade-card">
        <h3>No results found</h3>
        <p>Try searching with another keyword or filter.</p>
      </div>
    `;
    return;
  }

  postsToShow.forEach((post, index) => {
    const card = document.createElement("article");
    card.className = "trade-card";

    card.innerHTML = `
      <div class="card-top">
        <span class="type-pill">${post.category}</span>
        <span class="status-pill">${post.status}</span>
      </div>

      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <p class="owner-text">Posted by: ${post.owner}</p>

      <button onclick="markInterest(${index})">Request / Interested</button>
    `;

    postContainer.appendChild(card);
  });

  listingCount.textContent = campusPosts.length;
}

function applySearch() {
  const keyword = document.getElementById("keywordBox").value.toLowerCase();
  const type = document.getElementById("typeBox").value;
  const status = document.getElementById("statusBox").value;

  const filteredPosts = campusPosts.filter((post) => {
    const keywordMatch =
      post.title.toLowerCase().includes(keyword) ||
      post.description.toLowerCase().includes(keyword) ||
      post.owner.toLowerCase().includes(keyword);

    const typeMatch = type === "All" || post.category === type;
    const statusMatch = status === "All" || post.status === status;

    return keywordMatch && typeMatch && statusMatch;
  });

  renderPosts(filteredPosts);
}

function submitPost() {
  const title = document.getElementById("newTitle").value.trim();
  const description = document.getElementById("newDescription").value.trim();
  const category = document.getElementById("newCategory").value;
  const status = document.getElementById("newStatus").value;

  if (title === "" || description === "" || category === "") {
    alert("Please complete the title, description, and category.");
    return;
  }

  const newPost = {
    title: title,
    description: description,
    category: category,
    status: status,
    owner: "Logged-in Student"
  };

  campusPosts.unshift(newPost);

  document.getElementById("newTitle").value = "";
  document.getElementById("newDescription").value = "";
  document.getElementById("newCategory").value = "";
  document.getElementById("newStatus").value = "Available";

  renderPosts(campusPosts);

  alert("Your post has been added to the frontend preview.");
}

function markInterest(index) {
  interestCounter++;
  interestedCount.textContent = interestCounter;

  const selectedPost = campusPosts[index];
  alert("Interest request sent for: " + selectedPost.title);
}

function fakeLogin() {
  alert("Login interface ready. Backend authentication will be connected later.");
}

function fakeRegister() {
  alert("Registration interface ready. Backend database will be connected later.");
}

renderPosts(campusPosts);