<script>
  import Link from '../components/Link.svelte';

  export let address;
</script>

<p><Link href={`https://www.google.com/maps?q=${address}`} newTab>{address}</Link></p>
