import { reactive } from 'vue';

// new Set outside of export: global state (updates in every component used)
// if inside of export: state available only to 1 component, it wont update in other components
let selectedCheckBoxes = reactive(new Set())

export const useCheckBoxSelection = function () {

    // ...

    let selectAll = (allCheckBoxes) => {
        allCheckBoxes.forEach(checkBox => {
            selectedCheckBoxes.add(checkBox)
        })
    }

    let clear = () => {
        selectedCheckBoxes.clear()
    }

    let toggle = function (checkBox) {
        if (selectedCheckBoxes.has(checkBox)) {
            selectedCheckBoxes.delete(checkBox)
        } else {
            selectedCheckBoxes.add(checkBox)
        }
    }

    return {
        selectedCheckBoxes,
        selectAll,
        clear,
        toggle
    }
}

export default useCheckBoxSelection