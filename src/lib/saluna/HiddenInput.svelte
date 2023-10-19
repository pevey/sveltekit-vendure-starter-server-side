<script lang="ts">
   import { getFormField } from 'formsnap'
   const { name, setValue, actions } = getFormField()
   export let value: string
   setValue(value)
</script>
<input use:actions.input type="hidden" name={name} bind:value={value} />