<template>
  <ul @click="changeCategory" v-if="windowWidth >= 992" class="list-group list-unstyled cursor-pointer">
    <li :class="{ active: tempCategory === '帳號' }" class="list-group-item list-group-item-action">帳號</li>
    <li :class="{ active: tempCategory === '訂單' }" class="list-group-item list-group-item-action">訂單</li>
    <li :class="{ active: tempCategory === '我的最愛' }" class="list-group-item list-group-item-action">我的最愛</li>

  </ul>
  <select v-else v-model="tempCategory" @change="changeCategory" class="form-select"
    aria-label="Default select example">
    <option selected value="帳號">帳號</option>
    <option value="訂單">訂單</option>
    <option value="我的最愛">我的最愛</option>
  </select>
</template>

<script>
export default {
  inject: ['getWindowWidth'],
  data() {
    return {
      tempCategory: '帳號',
      windowWidth: this.getWindowWidth(),
    };
  },
  methods: {
    changeCategory(e) {
      if (e.target.tagName === 'SELECT') {
        this.tempCategory = e.target.value;
      } else {
        this.tempCategory = e.target.innerText;
      }
      this.$emit('change-category', this.tempCategory);
    },
  },
  mounted() {
    this.$emit('change-category', this.tempCategory);
    this.getWindowWidth();
    window.addEventListener('resize', () => {
      this.windowWidth = this.getWindowWidth();
    });
  },
  unmounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = this.getWindowWidth();
    });
  },
};
</script>
