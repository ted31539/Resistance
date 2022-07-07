<template>
  <ul @click="changeCategory" v-if="windowWidth >= 992" class="list-group list-unstyled cursor-pointer">
    <li :class="{ active: tempCategory === '所有商品' }" class="list-group-item list-group-item-action">所有商品</li>
    <li :class="{ active: tempCategory === 'T恤' }" class="list-group-item list-group-item-action">T恤</li>
    <li :class="{ active: tempCategory === '襯衫' }" class="list-group-item list-group-item-action">襯衫</li>
    <li :class="{ active: tempCategory === '外套' }" class="list-group-item list-group-item-action">外套</li>
    <li :class="{ active: tempCategory === '長褲' }" class="list-group-item list-group-item-action">長褲</li>
    <li :class="{ active: tempCategory === '短褲' }" class="list-group-item list-group-item-action">短褲</li>
    <li :class="{ active: tempCategory === '配件' }" class="list-group-item list-group-item-action">配件</li>
    <li :class="{ active: tempCategory === 'HardMax' }" class="list-group-item list-group-item-action">HardMax</li>
    <li :class="{ active: tempCategory === 'AirMax' }" class="list-group-item list-group-item-action">AirMax</li>
  </ul>
  <select v-else v-model="tempCategory" @change="changeCategory" class="form-select"
    aria-label="Default select example">
    <option selected value="所有商品">所有商品</option>
    <option value="T恤">T恤</option>
    <option value="襯衫">襯衫</option>
    <option value="外套">外套</option>
    <option value="長褲">長褲</option>
    <option value="短褲">短褲</option>
    <option value="配件">配件</option>
    <option value="HardMax">HardMax</option>
    <option value="AirMax">AirMax</option>
  </select>
</template>

<script>
export default {
  inject: ['getWindowWidth'],
  props: {
    category: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      tempCategory: '',
      windowWidth: this.getWindowWidth(),
    };
  },
  methods: {
    changeCategory(e) {
      let target = null;
      if (e.target.tagName === 'SELECT') {
        target = e.target.value;
      } else {
        target = e.target.innerText;
      }
      this.tempCategory = target;
      this.$router.push({ name: 'Products', query: { category: target } });
    },
  },
  watch: {
    category() {
      this.tempCategory = this.category;
    },
  },
  mounted() {
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
