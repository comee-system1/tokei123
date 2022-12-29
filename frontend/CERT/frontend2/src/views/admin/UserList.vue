<template>
  <div>
    <p>token</p>
    {{ keycloak.idToken }}
  </div>
</template>
<script>
export default {
  props: ['keycloak'],
};
</script>
