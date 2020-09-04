<script>
  import TiTimes from 'svelte-icons/ti/TiTimes.svelte';
</script>

<style>
  button {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;

    color: var(--ink_300);
    cursor: pointer;
    background-color: var(--ink_25);
    border: none;
    border-radius: 36px;
  }

  button:hover {
    color: var(--ink_400);
    background-color: var(--ink_50);
  }
</style>

<button on:click><TiTimes /></button>
