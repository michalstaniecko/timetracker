<script setup lang="ts">
const emits = defineEmits<{
  (event: 'close'): void;
}>();
withDefaults(
  defineProps<{
    show: boolean;
  }>(),
  {
    show: true
  }
);

const closeHandler = () => emits('close');
</script>

<template>
  <teleport to="body" v-if="show">
    <div class="base-popup">
      <div class="notification has-background-info-light">
        <button class="delete" @click.prevent="closeHandler"></button>
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
  right: 20px;
  width: 400px;
}
</style>
