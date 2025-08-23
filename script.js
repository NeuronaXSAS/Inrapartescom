// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.borderBottom = '1px solid #404040';
        } else {
            header.style.background = '#1A1A1A';
            header.style.backdropFilter = 'none';
            header.style.borderBottom = '1px solid #333';
        }

        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle for responsive navigation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('open');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when any nav link is clicked (mobile)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            });
        });
    }

    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            // Future cart functionality
            console.log('Cart clicked');
        });
    }

    // Category card animations
    const categoryCards = document.querySelectorAll('.category-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    categoryCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // CTA button click effect
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Read more buttons functionality
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoryCard = this.closest('.category-card');
            const categoryType = categoryCard.classList[1]; // brake-systems, suspension-systems, etc.
            
            // Future: Navigate to specific category page
            console.log(`Navigate to ${categoryType} page`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .cta-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Hero Slider Functionality
    const heroSlider = {
        slides: document.querySelectorAll('.hero-slide'),
        indicators: document.querySelectorAll('.indicator'),
        currentSlide: 0,
        interval: null,
        
        init() {
            this.startAutoSlide();
            this.bindEvents();
        },
        
        bindEvents() {
            // Navigation buttons
            const prevBtn = document.querySelector('.hero-nav-btn.prev');
            const nextBtn = document.querySelector('.hero-nav-btn.next');
            
            if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
            if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Indicators
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Pause on hover
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', () => this.pauseAutoSlide());
                heroSection.addEventListener('mouseleave', () => this.startAutoSlide());

                /* ----- Touch swipe support (mobile) ----- */
                let touchStartX = 0;
                heroSection.addEventListener('touchstart', (e) => {
                    touchStartX = e.touches[0].clientX;
                    this.pauseAutoSlide();
                });
                heroSection.addEventListener('touchend', (e) => {
                    const touchEndX = e.changedTouches[0].clientX;
                    const diffX = touchEndX - touchStartX;
                    if (Math.abs(diffX) > 40) {
                        diffX > 0 ? this.prevSlide() : this.nextSlide();
                    }
                    this.startAutoSlide();
                });
            }
        },
        
        goToSlide(index) {
            // Remove active class from current slide and indicator
            this.slides[this.currentSlide]?.classList.remove('active');
            this.indicators[this.currentSlide]?.classList.remove('active');
            
            // Set new current slide
            this.currentSlide = index;
            
            // Add active class to new slide and indicator
            this.slides[this.currentSlide]?.classList.add('active');
            this.indicators[this.currentSlide]?.classList.add('active');
        },
        
        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(next);
        },
        
        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.goToSlide(prev);
        },
        
        startAutoSlide() {
            this.pauseAutoSlide();
            this.interval = setInterval(() => this.nextSlide(), 4000); // 4 seconds
        },
        
        pauseAutoSlide() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    };
    
    // Quote System
    const quoteSystem = {
        items: [],
        modal: null,
        
        init() {
            this.modal = document.getElementById('quoteModal');
            this.bindEvents();
            this.updateCartCount();
        },
        
        bindEvents() {
            // Quote buttons
            document.addEventListener('click', (e) => {
                if (e.target.matches('.quote-btn') || e.target.matches('.add-to-quote-btn')) {
                    const productId = e.target.getAttribute('data-product');
                    this.addToQuote(productId);
                }
                
                if (e.target.matches('.quick-view-btn')) {
                    const productId = e.target.getAttribute('data-product');
                    this.showQuickView(productId);
                }
                
                if (e.target.matches('.custom-pieces-btn') || e.target.matches('.cta-btn.primary')) {
                    this.openQuoteModal();
                }
            });
            
            // Modal events
            if (this.modal) {
                const closeBtn = this.modal.querySelector('.close');
                const cancelBtn = this.modal.querySelector('#cancelQuote');
                const form = this.modal.querySelector('#quoteForm');
                
                closeBtn?.addEventListener('click', () => this.closeModal());
                cancelBtn?.addEventListener('click', () => this.closeModal());
                
                // Close modal when clicking outside
                this.modal.addEventListener('click', (e) => {
                    if (e.target === this.modal) this.closeModal();
                });
                
                form?.addEventListener('submit', (e) => this.handleQuoteSubmission(e));
            }
            
            // Cart button
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn?.addEventListener('click', () => this.showQuoteItems());
        },
        
        addToQuote(productId) {
            const products = {
                '1': {
                    id: '1',
                    name: 'Racor Hidráulico SAE R2',
                    price: 'Desde $45.000',
                    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                },
                '2': {
                    id: '2',
                    name: 'Válvula de Seguridad Industrial',
                    price: 'Desde $125.000',
                    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                },
                '3': {
                    id: '3',
                    name: 'Acople Freno de Aire',
                    price: 'Desde $87.000',
                    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
                }
            };
            
            const product = products[productId];
            if (!product) return;
            
            // Check if product already exists in quote
            const existingItem = this.items.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    ...product,
                    quantity: 1,
                    addedAt: new Date()
                });
            }
            
            this.updateCartCount();
            this.showAddedToQuoteNotification(product.name);
            
            // Save to localStorage
            localStorage.setItem('inrapartes_quote', JSON.stringify(this.items));
        },
        
        showQuickView(productId) {
            // For now, just open the quote modal with product info
            this.openQuoteModal(productId);
        },
        
        openQuoteModal(productId = null) {
            if (!this.modal) return;
            
            // If specific product, pre-fill some info
            if (productId) {
                const products = {
                    '1': 'Racor Hidráulico SAE R2 - Conectores de alta presión',
                    '2': 'Válvula de Seguridad Industrial - Válvulas certificadas',
                    '3': 'Acople Freno de Aire - Acoples especializados'
                };
                
                const productDetails = this.modal.querySelector('#productDetails');
                if (productDetails && products[productId]) {
                    productDetails.value = products[productId];
                }
            }
            
            this.modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        },
        
        closeModal() {
            if (!this.modal) return;
            
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset form
            const form = this.modal.querySelector('#quoteForm');
            form?.reset();
        },
        
        handleQuoteSubmission(e) {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = {
                name: formData.get('customerName') || document.getElementById('customerName').value,
                email: formData.get('customerEmail') || document.getElementById('customerEmail').value,
                phone: formData.get('customerPhone') || document.getElementById('customerPhone').value,
                company: formData.get('customerCompany') || document.getElementById('customerCompany').value,
                productDetails: formData.get('productDetails') || document.getElementById('productDetails').value,
                quoteItems: this.items,
                timestamp: new Date().toISOString()
            };
            
            // Validate required fields
            if (!data.name || !data.email || !data.phone) {
                alert('Por favor complete todos los campos obligatorios.');
                return;
            }
            
            // Simulate sending quote (in real implementation, use EmailJS or backend)
            this.sendQuote(data);
        },
        
        sendQuote(data) {
            // Show loading state
            const submitBtn = this.modal.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                this.showSuccessMessage();
                this.closeModal();
                
                // Log for demo purposes (remove in production)
                console.log('Cotización enviada:', data);
                
                // Clear quote items
                this.items = [];
                this.updateCartCount();
                localStorage.removeItem('inrapartes_quote');
                
            }, 2000);
        },
        
        showSuccessMessage() {
            const message = document.createElement('div');
            message.className = 'success-notification';
            message.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #4CAF50;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                ">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <i class="fas fa-check-circle"></i>
                        <span>¡Cotización enviada exitosamente!</span>
                    </div>
                    <div style="font-size: 12px; opacity: 0.9; margin-top: 5px;">
                        Nos contactaremos contigo pronto.
                    </div>
                </div>
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 5000);
        },
        
        showAddedToQuoteNotification(productName) {
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #FFD700;
                    color: #1A1A1A;
                    padding: 12px 20px;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                    max-width: 300px;
                ">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-plus-circle"></i>
                        <span style="font-weight: 600;">Agregado a cotización</span>
                    </div>
                    <div style="font-size: 12px; margin-top: 3px;">
                        ${productName}
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        },
        
        showQuoteItems() {
            if (this.items.length === 0) {
                alert('No hay productos en tu cotización. Agrega algunos productos para continuar.');
                return;
            }
            
            this.openQuoteModal();
            
            // Pre-fill product details with current items
            const productDetails = this.modal.querySelector('#productDetails');
            if (productDetails) {
                const itemsList = this.items.map(item => 
                    `${item.name} (Cantidad: ${item.quantity})`
                ).join('\n');
                productDetails.value = `Productos para cotizar:\n${itemsList}\n\nComentarios adicionales:`;
            }
        },
        
        updateCartCount() {
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
                cartCount.textContent = totalItems;
            }
        },
        
        loadFromStorage() {
            const saved = localStorage.getItem('inrapartes_quote');
            if (saved) {
                try {
                    this.items = JSON.parse(saved);
                    this.updateCartCount();
                } catch (e) {
                    console.error('Error loading quote from storage:', e);
                }
            }
        }
    };
    
    // Smooth scrolling for internal links
    const smoothScrolling = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };
    
    // Intersection Observer for animations
    const animations = {
        init() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);
            
            // Observe elements for animation
            document.querySelectorAll('.category-card, .product-card, .custom-feature').forEach(el => {
                el.classList.add('fade-in');
                observer.observe(el);
            });
        }
    };
    
    // Search functionality
    const search = {
        init() {
            const searchInput = document.querySelector('.search-input');
            const searchBtn = document.querySelector('.search-btn');
            
            if (searchInput && searchBtn) {
                searchBtn.addEventListener('click', () => this.performSearch());
                searchInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.performSearch();
                });
            }
        },
        
        performSearch() {
            const query = document.querySelector('.search-input').value.trim();
            if (query) {
                // For now, just show an alert. In real implementation, filter products
                alert(`Buscando: "${query}". Esta funcionalidad se implementará con el catálogo completo.`);
            }
        }
    };
    
    // Navigation dropdown improvements
    const navigation = {
        init() {
            // Remove old custom pieces link handlers since they're now proper links
            // Just handle smooth scrolling for internal anchors
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') {
                        e.preventDefault();
                        return;
                    }
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
            
            // Mobile menu toggle (for future responsive improvements)
            this.setupMobileMenu();
        },
        
        setupMobileMenu() {
            // Add mobile menu button if needed
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.display = 'none';
            
            // Add to header
            const headerActions = document.querySelector('.header-actions');
            if (headerActions) {
                headerActions.appendChild(mobileMenuBtn);
            }
        }
    };
    
    // Product interactions
    const products = {
        init() {
            // Compare functionality
            document.addEventListener('click', (e) => {
                if (e.target.matches('.compare-btn')) {
                    const productId = e.target.getAttribute('data-product');
                    this.addToCompare(productId);
                }
            });
        },
        
        addToCompare(productId) {
            // For now, just show notification
            const notification = document.createElement('div');
            notification.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    background: #2196F3;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 9999;
                ">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-balance-scale"></i>
                        <span>Producto agregado para comparar</span>
                    </div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    };
    
    // WhatsApp integration
    const whatsapp = {
        init() {
            // Already handled by the HTML link, but we can add tracking
            const whatsappBtn = document.querySelector('.whatsapp-float a');
            if (whatsappBtn) {
                whatsappBtn.addEventListener('click', () => {
                    // Track WhatsApp click (analytics)
                    console.log('WhatsApp button clicked');
                });
            }
        }
    };
    
        // Categories Carousel - paginated in blocks of 3
    const categoriesCarousel = {
        init() {
            console.log('🎠 Initializing FIXED categories carousel...');
            
            // Wait for DOM to be fully loaded
            setTimeout(() => {
                this.setup();
            }, 200);
        },
        
        setup() {
            // Get elements
            this.track = document.querySelector('.categories-track');
            this.prevBtn = document.querySelector('.prev-btn');
            this.nextBtn = document.querySelector('.next-btn');
            this.dots = document.querySelectorAll('.categories-dots .dot');
            
            console.log('🔍 Elements found:', {
                track: !!this.track,
                prevBtn: !!this.prevBtn,
                nextBtn: !!this.nextBtn,
                dots: this.dots.length
            });
            
            if (!this.track) {
                console.log('❌ Track not found - retrying...');
                setTimeout(() => this.setup(), 500);
                return;
            }
            
            // State
            this.currentPage = 0; // 0-based page index
            this.cardsPerPage = 3; // always move/show in blocks of 3
            this.cardWidth = this.computeCardWidth();

            // Measure and compute paging based on card count
            const cards = this.track.querySelectorAll('.category-card');
            this.totalCards = cards.length;
            this.totalPages = Math.max(1, Math.ceil(this.totalCards / this.cardsPerPage));
            // Clamp to exactly 2 pages for 6 cards, but keeps dynamic if more cards are added by multiples of 3
            // this.totalPages should already be correct for any count
            
            console.log('✅ Setting up carousel...');
            this.bindEvents();
            this.bindTouch();
            this.bindResize();
            this.updateCarousel();
        },

        computeCardWidth() {
            const firstCard = this.track?.querySelector('.category-card');
            if (!firstCard) return 352;
            const rect = firstCard.getBoundingClientRect();
            const style = window.getComputedStyle(this.track);
            const gap = parseFloat(style.gap || '0') || 0;
            // Effective width = card width + gap
            const width = Math.round(rect.width + gap);
            console.log(`📐 Computed cardWidth: ${width} (card: ${rect.width}, gap: ${gap})`);
            return width;
        },
        
    bindEvents() {
            console.log('🔗 Binding events...');
            
            // SAFE event binding with multiple approaches
            if (this.prevBtn) {
                // Method 1: onclick
                this.prevBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('⬅️ PREV CLICKED (onclick)');
                    this.goToPrev();
                };
                
                // Method 2: addEventListener
                this.prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('⬅️ PREV CLICKED (addEventListener)');
                    this.goToPrev();
                });
                
                // Method 3: Direct style
                this.prevBtn.style.pointerEvents = 'auto';
                this.prevBtn.style.cursor = 'pointer';
                this.prevBtn.style.zIndex = '1000';
                
                console.log('✅ Prev button bound with multiple methods');
            }
            
            if (this.nextBtn) {
                // Method 1: onclick
                this.nextBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('➡️ NEXT CLICKED (onclick)');
                    this.goToNext();
                };
                
                // Method 2: addEventListener
                this.nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('➡️ NEXT CLICKED (addEventListener)');
                    this.goToNext();
                });
                
                // Method 3: Direct style
                this.nextBtn.style.pointerEvents = 'auto';
                this.nextBtn.style.cursor = 'pointer';
                this.nextBtn.style.zIndex = '1000';
                
                console.log('✅ Next button bound with multiple methods');
            }
            
            // Dots with both methods
            this.dots.forEach((dot, index) => {
                dot.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`🔘 Dot ${index} clicked (onclick)`);
                    this.goToPage(index);
                };

                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`🔘 Dot ${index} clicked (addEventListener)`);
                    this.goToPage(index);
                });

                dot.style.cursor = 'pointer';
                dot.style.pointerEvents = 'auto';
            });
            
            console.log('✅ All events bound with multiple methods');
        },

        bindResize() {
            let resizeTimeout = null;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const oldWidth = this.cardWidth;
                    this.cardWidth = this.computeCardWidth();
                    if (oldWidth !== this.cardWidth) {
                        console.log('🔁 Resize detected, updating carousel transform');
                        this.updateCarousel();
                    }
                }, 100);
            });
        },
        
        goToPrev() {
            console.log(`⬅️ goToPrev() called. Current page: ${this.currentPage}`);
            const total = this.totalPages;
            this.currentPage = (this.currentPage - 1 + total) % total;
            this.updateCarousel();
            console.log(`✅ Moved to page ${this.currentPage}`);
        },
        
        goToNext() {
            console.log(`➡️ goToNext() called. Current page: ${this.currentPage}`);
            const total = this.totalPages;
            this.currentPage = (this.currentPage + 1) % total;
            this.updateCarousel();
            console.log(`✅ Moved to page ${this.currentPage}`);
        },
        
        goToPage(index) {
            console.log(`🎯 goToPage(${index}) called. Current page: ${this.currentPage}`);
            this.currentPage = Math.max(0, Math.min(index, this.totalPages - 1));
            this.updateCarousel();
        },
        
        updateCarousel() {
            if (!this.track) {
                console.log('❌ No track to update');
                return;
            }
            
            // Move the track by full pages
            const translateX = -(this.currentPage * this.cardsPerPage * this.cardWidth);
            this.track.style.transform = `translateX(${translateX}px)`;
            console.log(`🎯 Track moved to ${translateX}px (page: ${this.currentPage})`);
            
            // Update button states
            if (this.prevBtn) {
                this.prevBtn.disabled = false;
                this.prevBtn.style.opacity = '1';
            }
            if (this.nextBtn) {
                this.nextBtn.disabled = false;
                this.nextBtn.style.opacity = '1';
            }
            
            // Update dots
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentPage);
            });
            
            console.log(`🔄 Carousel updated: page ${this.currentPage + 1}/${this.totalPages}`);
        }
    };

    // Touch swipe support for categories carousel
    categoriesCarousel.bindTouch = function() {
        const area = document.querySelector('.categories-carousel');
        if (!area) return;
        let touchStartX = 0;
        let touchStartY = 0;
        area.addEventListener('touchstart', (e) => {
            if (!e.touches || e.touches.length === 0) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        area.addEventListener('touchend', (e) => {
            if (!e.changedTouches || e.changedTouches.length === 0) return;
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            // Only act on mostly horizontal swipes
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                dx > 0 ? categoriesCarousel.goToPrev() : categoriesCarousel.goToNext();
            }
        }, { passive: true });
    };

    // Initialize all modules with delay for carousel
    heroSlider.init();
    
    // Initialize carousel with delay to ensure DOM is ready
    setTimeout(() => {
        console.log('🎠 Initializing carousel with delay...');
        categoriesCarousel.init();
    }, 100);
    
    quoteSystem.init();
    quoteSystem.loadFromStorage();
    smoothScrolling.init();
    animations.init();
    search.init();
    navigation.init();
    products.init();
    whatsapp.init();
    
    // Add CSS animations if not already present
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .mobile-menu-btn {
                display: none !important;
                background: none;
                border: none;
                font-size: 20px;
                color: #1A1A1A;
                cursor: pointer;
            }
            
            @media (max-width: 768px) {
                .mobile-menu-btn {
                    display: block !important;
                }
                
                .main-nav {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Debug function for carousel
    window.testCarousel = function() {
        console.log('🧪 Testing carousel manually...');
        const track = document.querySelector('.categories-track');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const dots = document.querySelectorAll('.categories-dots .dot');
        
        console.log('🔍 Debug info:', {
            track: track ? 'Found' : 'Missing',
            prevBtn: prevBtn ? 'Found' : 'Missing',
            nextBtn: nextBtn ? 'Found' : 'Missing',
            dots: dots.length,
            trackStyle: track ? track.style.transform : 'N/A'
        });
        
        if (nextBtn) {
            console.log('🎯 Simulating next button click...');
            nextBtn.click();
        }
    };
    
    // Console log for demo
    console.log('Inrapartes website loaded successfully! 🔧');
    console.log('Features loaded:');
    console.log('- Hero slider with auto-rotation');
    console.log('- Categories horizontal carousel with touch support');
    console.log('- Quote system with local storage');
    console.log('- WhatsApp integration');
    console.log('- Smooth scrolling and animations');
    console.log('- Product interactions');
    console.log('');
    console.log('🧪 Type "testCarousel()" in console to test the carousel manually');
});

// Global utilities
window.InrapartesUtils = {
    // Update featured products easily
    updateFeaturedProducts: function(products) {
        const productContainer = document.querySelector('.products-grid.featured-products');
        if (!productContainer || !Array.isArray(products) || products.length !== 3) {
            console.error('Invalid products array. Must contain exactly 3 products.');
            return;
        }
        
        productContainer.innerHTML = '';
        
        products.forEach((product, index) => {
            const productCard = `
                <div class="product-card" data-product-id="${product.id}">
                    <div class="product-badge ${product.badgeType || ''}">${product.badge || 'Nuevo'}</div>
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-actions">
                            <button class="quick-view-btn" data-product="${product.id}">Vista Rápida</button>
                            <button class="add-to-quote-btn" data-product="${product.id}">Agregar a Cotización</button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">${product.price}</div>
                        <div class="product-buttons">
                            <button class="compare-btn" data-product="${product.id}">Comparar</button>
                            <button class="quote-btn" data-product="${product.id}">Cotizar</button>
                        </div>
                    </div>
                </div>
            `;
            productContainer.innerHTML += productCard;
        });
        
        console.log('Featured products updated successfully!');
    }
}; 