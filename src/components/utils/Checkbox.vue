    <template>
        <div class="d-flex align-items-center">
            <input name="chk[]" type="checkbox" :value="value" v-model="model" class="chkbox">
            <label for="default-checkbox" class="ms-2 lbl">{{ label }}</label>
        </div>

    </template>

<script setup>
import { computed, onMounted } from "vue";

const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object] },
    label: { type: String },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});

// let { chkText, chkVModel } = toRefs(props)
// var { chkText, chkVModel } = props

var notChk = () => {
    var lbl = window.document.querySelectorAll('label')
    lbl.onclick = function () {
        model.value = ''
    }
}

onMounted(() => {
    notChk()
})

</script>

<style scoped>
.chkbox {
    width: 0.7rem;
    height: 0.7rem;
}
.lbl{
    font-size: 0.6rem;
    font-weight: 500;
    color: #000;
}
</style>