<script setup lang="ts">
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emits = defineEmits<{
  (event: 'close'): void;
}>();
const props = withDefaults(
  defineProps<{
    show: boolean;
    icon: string;
    disableClose: boolean;
  }>(),
  {
    show: true,
    icon: 'fa-xmark',
    disableClose: false
  }
);
const closeHandler = () => emits('close');
</script>

<template>
  <teleport to="body" v-if="show">
    <div class="base-popup card">
      <div class="notification has-background-info-light">
        <button
          v-if="!disableClose"
          class="base-popup__close is-small button is-light is-inverted"
          @click.prevent="closeHandler"
        >
          <font-awesome-icon class="is-large icon" :icon="`fa-solid ${icon}`" />
        </button>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.base-popup {
  position: fixed;
  z-index: 1000;
  bottom: 20px;
  left: 20px;
  width: 400px;
}

.base-popup__close {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
