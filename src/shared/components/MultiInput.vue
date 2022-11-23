<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import { PrimeIcons } from 'primevue/api';
import { refAutoReset, tryOnMounted, useVModel, whenever } from '@vueuse/core';
import { computed, ref, toRef, useSlots, watch } from 'vue';
import { switchAssign } from '~/shared/utils/switch';

const props = withDefaults(
  defineProps<{
    /* General */
    modelValue?: string | number | null;
    type?: 'input' | 'textarea' | 'number' | 'select';
    icon?: keyof typeof PrimeIcons;
    label?: string;
    error?: string;
    isFocused?: boolean;
    isInvalid?: boolean;
    isAutofocus?: boolean;
    isLoading?: boolean;
    isReadonly?: boolean;
    isClearable?: boolean;
    /* Simple */
    placeholder?: string;
    isSimple?: boolean;
    /* Select */
    options?: unknown[];
    optionsLabel?: string;
    optionsKey?: string;
    search?: string | null;
    isSearchable?: boolean;
    /* Number */
    bounds?: { min?: number; max?: number };
  }>(),
  {
    type: 'input',
    bounds: () => ({}),
  },
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void;
  (e: 'update:isFocused', value: boolean): void;
  (e: 'update:search', value: string | null): void;
  (e: 'warn'): void;
}>();

const valueModel = useVModel(props, 'modelValue', emits);
const searchModel = useVModel(props, 'search', emits);
const isFocusedModel = useVModel(props, 'isFocused', emits);

if (props.type === 'number') {
  watch(toRef(props, 'modelValue'), (value) => {
    if (value != null) {
      const { min, max } = props.bounds;
      if (min != null && value < min) {
        emits('update:modelValue', min);
      } else if (max != null && value > max) {
        emits('update:modelValue', max);
      }
    }
  });
}

const isClearBtnShowed = computed(
  () =>
    valueModel.value != null &&
    valueModel.value !== '' &&
    !props.isReadonly &&
    props.isClearable,
);

const isEmpty = computed(
  () => valueModel.value == null || valueModel.value === '',
);
const isLabelLifted = computed(
  () => !props.isSimple && (isFocusedModel.value || !isEmpty.value),
);
const isLabelShowed = computed(() => !props.isSimple || isEmpty.value);

const shieldRef = ref<HTMLDivElement>();

const isHighlighted = refAutoReset(false, 300);
function onClick() {
  if (props.isReadonly) {
    isHighlighted.value = true;
    emits('warn');
  }
}

const inputType = computed(() =>
  switchAssign(props.type, {
    input: InputText,
    textarea: Textarea,
    number: InputNumber,
    select: Dropdown,
  }),
);

const inputRef = ref();
watch(isFocusedModel, (value) => {
  const inputEl = inputRef.value.$el;
  value ? inputEl?.focus() : inputEl?.blur();
});
whenever(
  () => props.isReadonly,
  () => inputRef.value.$el?.blur(),
);

tryOnMounted(() => {
  if (props.isAutofocus || isFocusedModel.value) {
    inputRef.value.$el?.focus();
  }
});

const slots = useSlots();
</script>

<template>
  <div
    :class="{
      _loading: props.isLoading,
      _simple: props.isSimple,
      _number: props.type === 'number',
      'p-input-icon-left': props.icon,
      'p-input-icon-right': props.isLoading,
    }"
    class="multi-input-component p-float-label"
  >
    <i v-if="props.icon" :class="PrimeIcons[props.icon]" class="icon" />

    <transition>
      <label
        v-if="props.label"
        v-show="isLabelShowed"
        :class="{ _lifted: isLabelLifted }"
        class="label"
      >
        {{ props.label }}
      </label>
    </transition>

    <span class="input-outer">
      <Component
        :is="inputType"
        ref="inputRef"
        v-model="valueModel"
        :placeholder="props.placeholder"
        :class="{
          _clearable: props.isClearable && props.type !== 'select',
          _readonly: props.isReadonly,
          'p-invalid': props.error || props.isInvalid,
        }"
        :options="props.options"
        :option-label="props.optionsLabel"
        :option-value="props.optionsKey"
        :data-key="props.optionsKey"
        :disabled="props.isDisabled"
        :readonly="props.isReadonly"
        :min="props.bounds[0]"
        :max="props.bounds[1]"
        :show-buttons="props.type === 'number'"
        :auto-resize="props.type === 'textarea'"
        :show-clear="isClearBtnShowed"
        class="input"
        @focus="isFocusedModel = true"
        @blur="isFocusedModel = false"
      >
        <template v-if="props.type === 'select' && props.isSearchable" #header>
          <MultiInput
            v-model="searchModel"
            class="select-search"
            icon="SEARCH"
            placeholder="Search"
            :is-loading="props.isLoading"
            is-simple
            is-autofocus
            is-clearable
          />
        </template>

        <template v-if="slots.value" #value="slotProps">
          <slot name="value" :value="slotProps" />
        </template>

        <template v-if="slots.option" #option="slotProps">
          <slot name="option" :value="slotProps" />
        </template>
      </Component>

      <span
        ref="shieldRef"
        class="shield"
        :class="{
          _hidden: !props.isReadonly,
          _warned: props.isReadonly && isHighlighted,
        }"
        @click="onClick"
      />
    </span>

    <Transition>
      <i
        v-show="props.isLoading"
        :class="[PrimeIcons.SPINNER, { _offset: isClearBtnShowed }]"
        class="spinner pi-spin"
      />
    </Transition>

    <Transition>
      <i
        v-show="isClearBtnShowed"
        v-if="isClearable && props.type !== 'select'"
        class="clear-btn"
        :class="PrimeIcons.TIMES_CIRCLE"
        @click="valueModel = null"
      />
    </Transition>

    <Transition mode="out-in">
      <small v-if="props.error" :key="props.error" class="error p-error">
        {{ props.error }}
      </small>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/mixins';
@use '../styles/constants';
@use '../styles/transitions';

.multi-input-component {
  position: relative;
  padding: 18px 0;
  box-sizing: content-box;
  display: flex;
  align-items: center;

  &._simple {
    padding: 0;
  }

  .icon {
    z-index: 1;
  }

  &.p-input-icon-left {
    .label {
      left: 34px;
    }
  }

  .label {
    @include transitions.fade();
    z-index: 1;
    position: absolute;
    left: 10px;
    top: calc(50% + 6px - #{constants.$fsz-text});
    font-size: constants.$fsz-text;
    pointer-events: none;

    &._lifted {
      left: 15px;
      top: 2px;
      font-size: constants.$fsz-text * 0.85;
    }
  }

  .p-inputtext,
  .p-inputtextarea,
  .p-inputnumber,
  .p-dropdown {
    &._readonly {
      border-color: transparent;
      box-shadow: none;

      ::v-deep(.p-inputtext) {
        border-color: transparent;
        box-shadow: none;
      }
    }
  }

  .p-inputtext,
  .p-inputtextarea {
    &._clearable {
      padding-right: 30px;
    }
  }

  .p-inputnumber {
    &._readonly {
      ::v-deep(.p-inputnumber-button) {
        background: #64748b;
        border-color: #64748b;
      }
    }

    &._clearable {
      ::v-deep(.p-inputnumber-input) {
        padding-right: 30px;
      }
    }
  }

  .p-dropdown {
    &._readonly {
      ::v-deep(.p-dropdown-label) {
        box-shadow: none;
      }
    }
  }

  .error {
    @include transitions.move($x: 10px);
    z-index: 1;
    position: absolute;
    bottom: 2px;
    left: 10px;
  }

  .input-outer {
    position: relative;
    width: 100%;

    .input {
      width: 100%;
    }

    .shield {
      @include mixins.size(fill);
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid transparent;
      border-radius: var(--border-radius);
      cursor: not-allowed;
      transition: constants.$trn-slow-out;

      &._hidden {
        display: none;
      }

      &._warned {
        border-color: constants.$clr-danger;
      }
    }
  }

  .spinner {
    @include transitions.fade();
    right: 12px !important;

    &._offset {
      right: 35px !important;
    }
  }

  .clear-btn {
    @include transitions.fade();
    position: absolute;
    right: 12px;
    color: #939393;
    cursor: pointer;
    transition: constants.$trn-slow-out;

    &:hover {
      color: #4d4d4d;
    }
  }

  &._number {
    .clear-btn {
      right: 50px;
    }
  }

  ::v-deep(.p-dropdown-trigger) {
    transition: constants.$trn-slow-out;
  }

  &._loading {
    ::v-deep(.p-dropdown-trigger) {
      opacity: 0;
      pointer-events: none;
    }
  }
}

.select-search {
  margin: 10px;
}
</style>
