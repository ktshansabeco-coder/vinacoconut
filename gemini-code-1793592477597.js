/**
 * VinaCoco – Đặc sản Dừa Việt Nam
 * Mã nguồn tương tác Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Cấu hình thông tin liên hệ tập trung
  const CONTACT_CONFIG = {
    phone: '0905876567',
    zalo: '0905876567',
    email: 'lienhe@vinacoco.vn'
  };

  /* ==========================================================================
     1. DỮ LIỆU CHI TIẾT 6 SẢN PHẨM (HIỂN THỊ TRONG MODAL)
     ========================================================================== */
  const PRODUCTS_DATA = {
    p1: {
      name: 'Dừa nướng giòn rụm VinaCoco vị mè rang',
      category: 'Dừa sấy & Bánh dừa',
      weight: 'Túi Zip 150g / Hộp quà 250g',
      expiry: '12 tháng kể từ ngày sản xuất',
      cert: 'OCOP 4 Sao & ISO 22000',
      ingredients: 'Cùi dừa già Bến Tre & Quảng Ngãi tuyển chọn (85%), hạt mè rang thơm (10%), đường mía thô nguyên mật (4%), muối biển hầm (1%).',
      storage: 'Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Kéo kín miệng túi zip ngay sau mỗi lần sử dụng để giữ độ giòn rụm.'
    },
    p2: {
      name: 'Nước dừa tươi đóng lon tiệt trùng nguyên chất',
      category: 'Nước dừa & Thức uống',
      weight: 'Lon 330ml (Thùng 24 lon)',
      expiry: '18 tháng kể từ ngày sản xuất',
      cert: 'Chuẩn VietGAP & FDA Hoa Kỳ',
      ingredients: '100% nước dừa xiêm xanh tươi nguyên chất thu hoạch đúng độ tuổi 8 tháng, không chất bảo quản, không đường tinh luyện.',
      storage: 'Bảo quản ở nhiệt độ phòng thoáng mát. Ngon hơn khi ướp lạnh. Sau khi mở nắp lon, bảo quản trong tủ lạnh và dùng hết trong vòng 24 giờ.'
    },
    p3: {
      name: 'Dầu dừa nguyên chất ép lạnh tinh khiết',
      category: 'Dầu dừa & Mỹ phẩm tự nhiên',
      weight: 'Chai thủy tinh 250ml & 500ml (Kèm vòi nhấn)',
      expiry: '24 tháng kể từ ngày sản xuất',
      cert: '100% Cold-Pressed Organic',
      ingredients: '100% tinh chất dầu từ cơm dừa tươi tách nước bằng công nghệ ép lạnh ly tâm không qua gia nhiệt, giữ trọn Vitamin E và hơn 50% Axit Lauric.',
      storage: 'Để nơi khô thoáng, tránh nắng. Dầu dừa tự nhiên sẽ đông đặc trắng mịn khi nhiệt độ dưới 25°C, chỉ cần ngâm nước ấm sẽ tan chảy bình thường.'
    },
    p4: {
      name: 'Mật hoa dừa hữu cơ cô đặc',
      category: 'Mật & Nông sản dừa lên men',
      weight: 'Hũ thủy tinh 250g / Chai 375ml',
      expiry: '18 tháng kể từ ngày sản xuất',
      cert: 'Thuần Chay & Chỉ Số Đường Huyết Thấp (Low-GI)',
      ingredients: '100% dịch nhựa thu hoạch thủ công từ bắp hoa dừa hữu cơ, cô đặc chân không ở nhiệt độ thấp 55°C giữ trọn khoáng chất và axit amin.',
      storage: 'Đậy kín nắp sau khi dùng. Khuyến khích bảo quản trong ngăn mát tủ lạnh sau khi đã mở nắp để giữ hương vị thơm ngon nhất.'
    },
    p5: {
      name: 'Dừa sợi sấy thăng hoa ít ngọt',
      category: 'Dừa sấy & Bánh dừa',
      weight: 'Hộp thiếc cao cấp 180g',
      expiry: '12 tháng kể từ ngày sản xuất',
      cert: 'Công Nghệ Freeze Drying Hiện Đại',
      ingredients: 'Cùi dừa bánh tẻ bào sợi (97%), mật hoa dừa hữu cơ tự nhiên (3%). Hoàn toàn không dùng chất tẩy trắng.',
      storage: 'Đậy kín nắp hộp thiếc sau khi sử dụng để ngăn độ ẩm không khí làm mềm sợi dừa.'
    },
    p6: {
      name: 'Xà bông hữu cơ tinh chất dầu dừa & cám gạo',
      category: 'Dầu dừa & Mỹ phẩm tự nhiên',
      weight: 'Bánh 100g (Đóng hộp giấy Kraft mộc)',
      expiry: '24 tháng kể từ ngày sản xuất',
      cert: '100% Handmade Thảo Mộc Tự Nhiên',
      ingredients: 'Dầu dừa ép lạnh xà phòng hóa (65%), bột cám gạo nếp thơm, Glycerin thực vật tự nhiên, tinh dầu sả chanh nguyên chất.',
      storage: 'Đặt bánh xà bông lên khay có rãnh thoát nước khô ráo sau khi tắm hoặc rửa mặt, tránh ngâm trực tiếp trong nước đọng.'
    }
  };

  /* ==========================================================================
     2. STICKY NAVIGATION, MOBILE MENU & BACK-TO-TOP
     ========================================================================== */
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Đổi màu nền thanh điều hướng khi cuộn trang
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hiển thị nút cuộn lên đầu trang
    if (currentScroll > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Đóng/mở menu trên điện thoại
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isExpanded));
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ==========================================================================
     3. BỘ LỌC SẢN PHẨM BẰNG TAB JS (HIỆU ỨNG FADE / ZOOM)
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterValue = tab.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        card.classList.remove('anim-in');

        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex';
          void card.offsetWidth; // Trigger reflow để chạy lại animation
          card.classList.add('anim-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     4. LIGHTBOX / MODAL CHI TIẾT SẢN PHẨM
     ========================================================================== */
  const modal = document.getElementById('product-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');
  const openModalBtns = document.querySelectorAll('.js-open-modal');

  const openModal = (productId) => {
    const item = PRODUCTS_DATA[productId];
    if (!item) return;

    const zaloOrderUrl = `https://zalo.me/${CONTACT_CONFIG.zalo}?text=${encodeURIComponent('Chào VinaCoco, tôi muốn đặt mua sản phẩm: ' + item.name)}`;

    modalBody.innerHTML = `
      <span class="section-badge" style="margin-bottom: 8px;">${item.cert}</span>
      <h2 style="font-size: 1.5rem; margin-bottom: 6px;">${item.name}</h2>
      <p style="color: var(--accent-color); font-weight: 700; font-size: 0.88rem;">Danh mục: ${item.category}</p>

      <div class="modal-specs-grid">
        <div><strong>Khối lượng / Quy cách:</strong><br>${item.weight}</div>
        <div><strong>Hạn sử dụng:</strong><br>${item.expiry}</div>
      </div>

      <div style="margin-bottom: 14px;">
        <h4 style="font-size: 1rem; color: var(--primary-color); margin-bottom: 4px;">Thành phần nguyên liệu:</h4>
        <p style="font-size: 0.95rem; color: #333;">${item.ingredients}</p>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 1rem; color: var(--primary-color); margin-bottom: 4px;">Hướng dẫn bảo quản:</h4>
        <p style="font-size: 0.95rem; color: #333;">${item.storage}</p>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        <a href="${zaloOrderUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
          Đặt Mua Qua Zalo Ngay
        </a>
        <a href="tel:${CONTACT_CONFIG.phone}" class="btn btn-outline">
          Gọi Hotline: ${CONTACT_CONFIG.phone}
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.getAttribute('data-id'));
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     5. ACCORDION CÂU HỎI THƯỜNG GẶP (FAQ)
     ========================================================================== */
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parentItem = trigger.parentElement;
      const panel = parentItem.querySelector('.accordion-panel');
      const isOpen = parentItem.classList.contains('open');

      // Đóng các tab khác
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        item.querySelector('.accordion-panel').style.maxHeight = null;
      });

      // Mở tab hiện tại nếu đang đóng
      if (!isOpen) {
        parentItem.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     6. VALIDATE FORM & CHUYỂN HƯỚNG MỞ ZALO / EMAIL THẬT
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const mailtoBtn = document.getElementById('btn-mailto');
  const fullnameInput = document.getElementById('fullname');
  const phoneInput = document.getElementById('phone');
  const interestSelect = document.getElementById('interest');
  const messageInput = document.getElementById('message');

  const errorFullname = document.getElementById('error-fullname');
  const errorPhone = document.getElementById('error-phone');

  // Kiểm tra định dạng số điện thoại Việt Nam (10 số, đầu 03, 05, 07, 08, 09 hoặc +84)
  const isValidVNPhone = (phoneStr) => {
    const cleanPhone = phoneStr.replace(/\s+|\.|-/g, '');
    return /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/.test(cleanPhone);
  };

  const validateForm = () => {
    let isValid = true;
    errorFullname.textContent = '';
    errorPhone.textContent = '';

    if (fullnameInput.value.trim().length < 2) {
      errorFullname.textContent = 'Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự).';
      isValid = false;
    }

    if (!isValidVNPhone(phoneInput.value)) {
      errorPhone.textContent = 'Số điện thoại không đúng định dạng Việt Nam (VD: 0905876567).';
      isValid = false;
    }

    return isValid;
  };

  // Khi bấm Gửi qua Zalo
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const name = fullnameInput.value.trim();
      const phone = phoneInput.value.trim();
      const product = interestSelect.value;
      const note = messageInput.value.trim() || 'Cần tư vấn báo giá chi tiết';

      const messageText =
        `Chào VinaCoco! Tôi gửi yêu cầu từ Website:\n` +
        `- Họ tên: ${name}\n` +
        `- SĐT: ${phone}\n` +
        `- Quan tâm: ${product}\n` +
        `- Lời nhắn: ${note}`;

      const zaloRedirectUrl = `https://zalo.me/${CONTACT_CONFIG.zalo}?text=${encodeURIComponent(messageText)}`;
      window.open(zaloRedirectUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // Khi bấm Gửi qua Email (mailto:)
  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => {
      if (!validateForm()) return;

      const name = fullnameInput.value.trim();
      const phone = phoneInput.value.trim();
      const product = interestSelect.value;
      const note = messageInput.value.trim() || 'Cần tư vấn báo giá chi tiết';

      const mailSubject = encodeURIComponent(`[VinaCoco] Yêu cầu tư vấn từ ${name} (${phone})`);
      const mailBody = encodeURIComponent(
        `Xin chào VinaCoco – Đặc sản Dừa Việt Nam,\n\n` +
        `Tôi muốn đăng ký tư vấn / đặt hàng với thông tin sau:\n` +
        `- Họ và tên: ${name}\n` +
        `- Số điện thoại: ${phone}\n` +
        `- Dòng sản phẩm quan tâm: ${product}\n` +
        `- Lời nhắn / Số lượng: ${note}\n\n` +
        `Rất mong sớm nhận được phản hồi từ quý thương hiệu.`
      );

      window.location.href = `mailto:${CONTACT_CONFIG.email}?subject=${mailSubject}&body=${mailBody}`;
    });
  }
});