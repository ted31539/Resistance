<template>
  <section class="about-banner vh-30 position-relative">
  </section>
  <section class="container py-11">
    <ol class="breadcrumb px-3 mb-10">
      <li class="breadcrumb-item">
        <router-link :to="`/`" class="text-primary">首頁</router-link>
      </li>
      <li class="breadcrumb-item active">品牌故事</li>
    </ol>
    <h2 class="text-center mb-15">品牌故事</h2>
    <div class="row mb-11 mb-md-0 g-0">
      <div class="col-12 col-md-4 me-md-auto
      d-flex flex-column justify-content-center justify-content-md-start
      justify-content-lg-center align-items-center align-items-md-start ">
        <h3 class="flex-shrink-1 mb-8">台灣設計、製造</h3>
        <p class="text-black-50 mb-4">
          Resistance創立於2018年，由台灣設計師、紡織布料研究者與戶外活動愛好者共同創辦，追求耐磨、機能的服飾，擅長cityboy的潮流感。</p>
      </div>
      <div class="col-12 col-md-6 d-flex align-items-center">
        <img src="~@/assets/image\about-brand.jpg" alt="fabric">
      </div>
    </div>
    <div class="row g-0">
      <div class="col-12 col-md-4 order-md-1 offset-md-2 text-md-end me-md-auto d-flex
      flex-column align-items-center align-items-md-end justify-content-center
      justify-content-md-end justify-content-lg-center">
        <h3 class="d-inline-flex mb-8">耐磨、機能、潮流</h3>
        <p class="text-black-50 mb-4 mb-md-0">
          Resistance每年投入40%營收，與台灣紡織研究所共同開發尖端紡織技術，並與台灣紡織廠合作，培養台灣設計師與紡織技藝，壯大台灣紡織王國的疆土，立志成為全球戶外機能品牌。</p>
      </div>
      <div class="col-12 col-md-6 d-flex align-items-center">
        <img src="~@/assets/image\about-us.jpg" alt="fabric">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
};
</script>
