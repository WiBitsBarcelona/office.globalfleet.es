<template>
    <p>Stages</p>
    <ul>
        <li>
            
        </li>
    </ul>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps([
  'stages'
]);

const stages = ref('');

watchEffect(() => {
    stages.value = props.stages;

    console.log(stages.value);
});



</script>