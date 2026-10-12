document.addEventListener("DOMContentLoaded", () => {
    // LÓGICA DO FILTRO DE PRODUTOS (Swiper)
    const categoriaSelect = document.getElementById("categoria");
    if (categoriaSelect) {
        let swiperFeminino = null;
        let swiperMasculino = null;

        function initSwiper(selector, nextButton, prevButton) {
            return new Swiper(selector, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                observer: true,
                observeParents: true,
                autoplay: { delay: 3000, disableOnInteraction: false },
                navigation: { nextEl: nextButton, prevEl: prevButton },
                breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        }

        // Inicializa o carrossel feminino logo ao carregar a página
        swiperFeminino = initSwiper('.swiper-feminino', '.swiper-button-next-feminino', '.swiper-button-prev-feminino');

        function filtrarProdutos() {
            const cat = categoriaSelect.value;
            const produtosFeminino = document.getElementById("produtos-feminino");
            const produtosMasculino = document.getElementById("produtos-masculino");

            if (cat === "feminino") {
                produtosFeminino.style.display = "block";
                produtosMasculino.style.display = "none";
                if (swiperFeminino) swiperFeminino.update();
            } else if (cat === "masculino") {
                produtosFeminino.style.display = "none";
                produtosMasculino.style.display = "block";
                if (!swiperMasculino) {
                    swiperMasculino = initSwiper('.swiper-masculino', '.swiper-button-next-masculino', '.swiper-button-prev-masculino');
                } else {
                    swiperMasculino.update();
                }
            }
        }
        
        categoriaSelect.addEventListener("change", filtrarProdutos);
    }

    // EVENTOS DO PIXEL DA META (cliques em botões e links)
    function rastrear(tipo, evento, parametros) {
        if (typeof fbq !== "function") return;
        fbq(tipo, evento, parametros || {});
    }

    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        const href = link.getAttribute("href") || "";

        if (href.includes("wa.me")) {
            const cupom = href.includes("CUPOM");
            rastrear("track", "Contact", { content_name: cupom ? "WhatsApp - Cupom de desconto" : "WhatsApp - Contatos" });
        } else if (href.includes("maps.app.goo.gl") || href.includes("google.com/maps")) {
            rastrear("track", "FindLocation", { content_name: "Botão Localização" });
        } else if (href.includes("instagram.com")) {
            rastrear("trackCustom", "CliqueInstagram");
        } else if (href.includes("facebook.com")) {
            rastrear("trackCustom", "CliqueFacebook");
        } else if (link.id === "voltar-ao-topo") {
            rastrear("trackCustom", "CliqueVoltarAoTopo");
        } else if (href.startsWith("#") && href.length > 1) {
            rastrear("trackCustom", "CliqueMenu", { secao: href.slice(1) });
        }
    });

    // Troca de categoria (Feminino/Masculino) = visualização de produtos
    if (categoriaSelect) {
        categoriaSelect.addEventListener("change", () => {
            rastrear("track", "ViewContent", { content_category: categoriaSelect.value });
        });
    }

    // LÓGICA DO BOTÃO "VOLTAR AO TOPO"
    const botaoVoltarAoTopo = document.getElementById('voltar-ao-topo');
    if (botaoVoltarAoTopo) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                botaoVoltarAoTopo.classList.add('visivel');
            } else {
                botaoVoltarAoTopo.classList.remove('visivel');
            }
        });
    }
});