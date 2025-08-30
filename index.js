// Tạo overlay element
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

// Tạo audio element
const audio = new Audio("NoiNayCoAnh-SonTungMTP-4772041.mp3"); // Đảm bảo sound.mp3 nằm trong cùng thư mục hoặc cung cấp đường dẫn chính xác
audio.loop = true; // Bật chế độ lặp
audio.volume = 1; // Đặt âm lượng tối đa

// Thêm hiệu ứng khi click vào ảnh
document.querySelectorAll(".photo-item").forEach((item) => {
  // Lấy năm từ data attribute hoặc có thể thay đổi theo cách bạn lưu trữ thông tin năm
  const year = item.getAttribute("data-year") || "2025"; // Mặc định là 2024 nếu không có data-year

  // Tạo element hiển thị năm
  const yearTag = document.createElement("div");
  yearTag.className = "year-tag";
  yearTag.textContent = year;
  item.appendChild(yearTag);

  item.addEventListener("click", function () {
    // Tạo overlay cho memory
    const memoryOverlay = document.createElement("div");
    memoryOverlay.className = "memory-overlay";
    document.body.appendChild(memoryOverlay);

    // Kiểm tra nếu item là video
    const videoElement = item.querySelector("video");
    const sourceElement = videoElement
      ? videoElement.querySelector("source")
      : null;
    const videoSrc = sourceElement
      ? sourceElement.getAttribute("src")
      : "No video found";

    console.log("Video element:", videoElement);
    console.log("Video source:", videoSrc);

    // Tạo card cho memory
    const memoryCard = document.createElement("div");
    memoryCard.className = "memory-card"; // Thêm class cho card
    memoryOverlay.appendChild(memoryCard);

    // Kiểm tra nếu item là video
    if (videoElement && videoSrc) {
      // Tạo element hiển thị video
      const memoryVideo = document.createElement("video");
      memoryVideo.src = videoSrc; // Lấy src từ video đã click
      memoryVideo.controls = false; // Ẩn thanh điều khiển video
      memoryVideo.loop = true; // Bật chế độ lặp
      memoryVideo.muted = true; // Vô hiệu hóa âm thanh nếu cần
      memoryVideo.autoplay = true; // Tự động phát video
      memoryVideo.style.width = "100%"; // Thay đổi kích thước video
      memoryVideo.style.maxHeight = "70vh"; // Giới hạn chiều cao tối đa
      memoryVideo.style.objectFit = "contain"; // Đảm bảo video không bị méo
      memoryCard.appendChild(memoryVideo);

      // Thêm sự kiện để phát video khi metadata đã được tải
      memoryVideo.addEventListener("loadedmetadata", () => {
        memoryVideo.play(); // Phát video
      });

      // Thêm sự kiện lỗi
      memoryVideo.addEventListener("error", (e) => {
        console.error("Error occurred while trying to play the video:", e);
      });
    } else {
      // Tạo element hiển thị ảnh
      const memoryImage = document.createElement("img");
      memoryImage.src = item.querySelector("img").src; // Lấy src từ ảnh đã click
      memoryImage.alt = item.querySelector("img").alt; // Lấy alt từ ảnh đã click
      memoryImage.style.width = "100%"; // Thay đổi kích thước ảnh
      memoryImage.style.maxHeight = "70vh"; // Giới hạn chiều cao tối đa
      memoryImage.style.objectFit = "contain"; // Đảm bảo ảnh không bị méo
      memoryCard.appendChild(memoryImage);
    }

    // Tạo caption
    const captionText = document.createElement("div");
    captionText.className = "caption"; // Thêm class cho caption
    captionText.textContent = item.querySelector(".caption").textContent; // Lấy caption từ item
    memoryCard.appendChild(captionText);

    // Thêm sự kiện click để đóng overlay
    memoryOverlay.addEventListener("click", () => {
      memoryOverlay.remove(); // Xóa overlay khi click
      overlay.classList.remove("active"); // Ẩn overlay mờ
    });

    // Làm tối màn hình
    overlay.classList.add("active"); // Hiển thị overlay mờ
  });
});

// Thêm hiệu ứng animation khi scroll
window.addEventListener("scroll", () => {
  const photos = document.querySelectorAll(".photo-item");
  photos.forEach((photo) => {
    const photoTop = photo.getBoundingClientRect().top;
    if (photoTop < window.innerHeight - 100) {
      photo.style.opacity = "1";
      photo.style.transform = "translateY(0)";
    }
  });
});

// Thêm animation cho tiêu đề khi scroll
function checkTitles() {
  const titles = document.querySelectorAll(".year-title, .month-title");
  titles.forEach((title) => {
    const titleTop = title.getBoundingClientRect().top;
    if (titleTop < window.innerHeight - 100) {
      title.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkTitles);
checkTitles(); // Kiểm tra ngay khi trang load

// Thêm hiệu ứng mưa sao băng
function createShootingStar() {
  const star = document.createElement("div");
  star.className = "shooting-star";

  // Random vị trí xuất hiện từ phía trên và bên trái màn hình
  star.style.left = `${Math.random() * (window.innerWidth - 500)}px`;
  star.style.top = `-50px`; // Bắt đầu từ trên màn hình

  document.body.appendChild(star);

  // Xóa sao sau khi animation kết thúc
  setTimeout(() => {
    star.remove();
  }, 1200); // Tăng thời gian hiển thị
}

// Tìm tất cả video và vô hiệu hóa âm thanh
document.querySelectorAll("video").forEach((video) => {
  video.muted = true; // Vô hiệu hóa âm thanh
  video.loop = true; // Bật chế độ lặp
});

// Thêm intro click event
const introOverlay = document.querySelector(".intro-overlay");
introOverlay.addEventListener("click", () => {
  audio.play(); // Phát âm thanh
  introOverlay.style.opacity = "0"; // Ẩn overlay
  setTimeout(() => {
    introOverlay.style.display = "none"; // Ẩn hoàn toàn sau khi fade out
  }, 500); // Thời gian khớp với transition
});
