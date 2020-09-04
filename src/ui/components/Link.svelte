<script>
  export let href;
  export let newTab = false;
</script>

<style>
  a, a:visited {
    color: var(--purple_500);
    text-decoration: none;
  }

  a:hover {
    color: var(--purple_300);
  }
</style>

<a {href} target={newTab && '_blank'} rel={newTab && 'noopener'}><slot /></a>
