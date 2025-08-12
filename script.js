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
                autoplay: { delay: 3000, disableOnInteraction: false },
                navigation: { nextEl: nextButton, prevEl: prevButton },
                breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        }

        function filtrarProdutos() {
            const cat = categoriaSelect.value;
            const produtosFeminino = document.getElementById("produtos-feminino");
            const produtosMasculino = document.getElementById("produtos-masculino");

            if (cat === "feminino") {
                produtosFeminino.style.display = "block";
                produtosMasculino.style.display = "none";
                if (!swiperFeminino) swiperFeminino = initSwiper('.swiper-feminino', '.swiper-button-next-feminino', '.swiper-button-prev-feminino');
            } else if (cat === "masculino") {
                produtosFeminino.style.display = "none";
                produtosMasculino.style.display = "block";
                if (!swiperMasculino) swiperMasculino = initSwiper('.swiper-masculino', '.swiper-button-next-masculino', '.swiper-button-prev-masculino');
            }
        }
        
        filtrarProdutos();
        categoriaSelect.addEventListener("change", filtrarProdutos);
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