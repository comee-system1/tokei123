<template>
  <v-app>
    <v-main>
      <HeaderAndNav></HeaderAndNav>
      <router-view :key="$route.fullPath">></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HeaderAndNav from './components/HeaderAndNav';
import * as wjcCore from '@grapecity/wijmo';

wjcCore.setLicenseKey(
  '692771655227224#B0hNLbhZmOiI7ckJye0ICbuFkI1pjIEJCLi4TPnNDbxQWaLJkU5tkZ7VGUnRnUG3GcDJXUKZjVrc6azRDb5EmZIREeFRHNroUO8hHSzV6Tjd5UylnVPFXbJVUe7NVeZNWc7YXUElnNRd7cIFmaqtiaalGaxMDaBt4TPZ5LWJ4dYZGOYN5U6sCcr5WM7UGc9IVezkUTmN4QOR5TvIkaHp7Sy86Uq3kSEh4K03iahl4ZX3GV9ZVb9kzbXpXQkt6KrEFStdWOoNnN72Cbwp6M486VYZjd5Y6Zx2mYQpFNShzbHNzcahWbrdVaxMnUaZkRxlmerIEexVXVLpmQ53EMkN4U8YUSl3EOQpnURJVVxZTa9Vna5xUSHl5djplVrNFejtCVDVnbFJETwQ6LUtyVwEVbQJUN4BXSOhGZsJ5QhRXTVh6duZnThp4ZXF4a84mVqhEOJpXaVpVS4YTOMFmclBnNOdGZ5IXRuh5cTlUOTdkWqFmYiojITJCLigjMzQUQERkI0ICSiwCNwMTM6UzMyYTM0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiczMxEjMwASOxETMxIDMyIiOiQncDJCLiEjLw8CMucjMxIiOiMXbEJCLi8LpnrJvk/IvlrKomPqgjb8gjfrgjf9gjz1gjz0gjDrgjLiOiEmTDJCLiQjMycjMyUTN6EzN7ITO6IiOiQWSiwSfdtlOicGbmJCLiMjdxIDMyIiOiIXZcJ5L'
);

export default {
  name: 'App',
  props: ['keycloak'],
  components: {
    HeaderAndNav,
  },
  data() {
    return {
      selectedData: {},
    };
  },
  methods: {},
};
</script>
