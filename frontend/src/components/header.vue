<template>
    <header  class='p-0 bg-dark navbar-dark'>
        <router-link to='/' class='navbar-brand'>
          <img src='./../assets/logo/icon-left-font-monochrome-white.png' width='150' alt='logo de groupomania' class="ml-2">
        </router-link>
    </header>
</template>

<script>
export default {
    name:'header'
}
</script>

<style lang="scss">
    header{
        height:10vh;
        position:sticky;
        z-index:90;
        top:0px;
    }
</style>