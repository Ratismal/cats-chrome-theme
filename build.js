const MaterialPicker = VueColor.Material;

const app = new Vue({
  el: '#app',
  components: { ColorPicker: VueColor.Chrome },
  data() {
    return {
      message: 'Hello Vue!',
      colors: {
        frame: '',
        frame_inactive: '',
        frame_incognito: '',
        frame_incognito_inactive: '',
        toolbar: '',
        tab_text: '',
        tab_background_text: '',
        bookmark_text: '',
        ntp_background: '',
        ntp_text: '',
        ntp_link: '',
        ntp_link_underline: '',
        ntp_header: '',
        ntp_section: '',
        ntp_section_text: '',
        ntp_section_link: '',
        ntp_section_link_underline: '',
        control_background: '',
        button_background: ''
      },
      outputClass: {
        output: true,
        clicked: false
      }
    }
  },
  mounted() {
    if (localStorage.colors) {
      this.colors = JSON.parse(localStorage.colors);
    }
  },
  watch: {
    colors: {
      deep: true,
      handler() {
        localStorage.colors = JSON.stringify(this.colors);
      }
    }
  },
  computed: {
    output() {
      console.log(this.colors);
      let out = {
        version: '1.0',
        name: 'cats-chrome-theme',
        manifest_version: 2,
        theme: {
          colors: {},
          properties: {}
        },
      }
      for (const c in this.colors) {
        let color = this.colors[c];
        if (color)
          out.theme.colors[c] = [color.rgba.r, color.rgba.g, color.rgba.b]
      }

      return JSON.stringify(out, null, 2);
    }
  },
  methods: {
    async copyOutput() {
      try {
        await navigator.clipboard.writeText(this.output);
        this.outputClass.clicked = true;
        setTimeout(() => this.outputClass.clicked = false, 500);
      } catch (err) {
        console.error(err);
      }
    }
  }
});