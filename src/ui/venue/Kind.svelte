<script>
  export let elements = [];

  const aloneDisplayMap = {
    'bite-drink': 'чая/кофе с дессертами',
    breakfast: 'завтрака',
    lunch: 'обеда',
    dinner: 'ужина',
  };

  const listDisplayMap = {
    'bite-drink': 'выпить чаю/кофе',
    breakfast: 'позавтракать',
    lunch: 'пообедать',
    dinner: 'поужинать',
  };
</script>

<style>
  li.bite-drink {
    list-style-type: '☕️ ';
  }

  li.breakfast {
    list-style-type: '🍳 ';
  }

  li.lunch {
    list-style-type: '🥙 ';
  }

  li.dinner {
    list-style-type: '🍗 ';
  }
</style>

{#if elements.length > 1}
  <p>Тут можно:</p>
  <ul>
    {#each elements as kind}
      <li class={kind}>{listDisplayMap[kind]}</li>
    {/each}
  </ul>
{:else if elements.length === 1}
  <p>Это место отлично подходит для {aloneDisplayMap[elements[0]]}.</p>
{/if}
