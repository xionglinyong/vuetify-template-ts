import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-types
    interface Element extends VNode {
    }

    // tslint:disable no-empty-types
    interface ElementClass extends Vue {
    }

    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $style: {
      [key: string]: string;
    };
  }

  interface VueConstructor {
    $style: {
      [key: string]: string;
    };
  }
}
