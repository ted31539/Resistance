<template>
  <section class="question-banner vh-30 position-relative">
  </section>
  <section class="container d-flex flex-column justify-content-center py-10">
    <ol class="breadcrumb px-3 mb-10">
      <li class="breadcrumb-item">
        <router-link :to="`/`" class="text-primary">首頁</router-link>
      </li>
      <li class="breadcrumb-item active">常見問題</li>
    </ol>
    <h3 class="mx-auto mb-10">常見問題</h3>
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            如何付款？
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
          data-bs-parent="#accordionExample">
          <ul class="accordion-body text-black-50 ps-8">
            <li>信用卡線上付款</li>
            <li>超商取貨付款</li>
            <li>銀行轉帳／ATM匯款</li>
            <li><strong>預購商品不適用超商取貨付款</strong></li>
          </ul>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            有哪些配送服務？
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample">
          <div class="accordion-body text-black-50">
            <h4 class="my-1">超商</h4>
            <p>7-11門市取貨付款，未滿3千，運費60元。</p>
            <p>全家門市取貨付款，未滿3千，運費60元。</p>
            <strong>商品到店後，請於7天內取貨，逾期取貨需支付來回運費120元。</strong>
            <strong>請填寫真實姓名、聯絡電話等資訊，取貨不付款請帶身分證。</strong>
            <h4 class="my-1">宅配</h4>
            <p>黑豹快遞，未滿三千，運費80元，寄送到指定地址。</p>
            <p>郵局快遞，未滿三千，運費80元，寄送到指定地址。</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            可以退換貨嗎？
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
          data-bs-parent="#accordionExample">
          <div class="accordion-body text-black-50">
            <strong>無換貨服務，一律退貨，重新下單！</strong>
            <p>七天內享有鑑賞期。</p>
            <p>商品不得下水、拆毀吊牌、毀損。</p>
            <p>退貨後，請通知課服人員，告知訂單編號。</p>
            <p>無須負擔運費。</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            如何退款？
          </button>
        </h2>
        <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
          data-bs-parent="#accordionExample">
          <div class="accordion-body text-black-50">
            <p>請通知客服人員<strong>resistance@resistance.com</strong>，將會為您提供最適合退款方式。</p>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingFive">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            有實體店面嗎？
          </button>
        </h2>
        <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive"
          data-bs-parent="#acollapseFive">
          <div class="accordion-body text-black-50">
            <p>高雄市海港路二段123號1樓。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Questions',
};
</script>
