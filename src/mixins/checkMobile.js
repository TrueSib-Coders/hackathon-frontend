import isMobile from 'ismobilejs';

const MOBILE_MAX = 640;
const PHABLET_MAX = 768;
const TABLET_MAX = 1024;

const onResize = function() {
  this.$set(this.globals.window, 'innerWidth', window.innerWidth);
};

const mixin = {
  data() {
    return {
      globals: {
        window: {},
      },
    };
  },
  computed: {
    checkMobile() {
      const width =
        this.globals && this.globals.window && this.globals.window.innerWidth;
      return {
        windowWidth: width,
        any: isMobile.any,
        mobile: isMobile.phone || width <= MOBILE_MAX,
        phablet: width > MOBILE_MAX && width <= PHABLET_MAX,
        tablet: isMobile.tablet || (width > PHABLET_MAX && width <= TABLET_MAX),
        desktop: !isMobile.any && width > TABLET_MAX,
      };
    },
  },
  mounted() {
    onResize.call(this);
    window.addEventListener('resize', onResize.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener('resize', onResize);
  },
};

export default mixin;
