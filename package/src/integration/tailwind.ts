import plugin from 'tailwindcss/plugin'

export const tailwindPlugin = plugin(
  () => {
    // Your plugin logic here
  },
  {
    theme: {
      spacing: {
        'space-sm-1': '3px',
        'space-sm-2': '6px',
        'space-sm-3': '12px',
        'space-sm-4': '24px',
        'space-sm-5': '48px',
        'space-sm-6': '72px',
        'space-md-1': '4px',
        'space-md-2': '8px',
        'space-md-3': '16px',
        'space-md-4': '32px',
        'space-md-5': '64px',
        'space-md-6': '96px',
        'space-lg-1': '5px',
        'space-lg-2': '10px',
        'space-lg-3': '20px',
        'space-lg-4': '40px',
        'space-lg-5': '80px',
        'space-lg-6': '120px',

        'element-sm-1': '6px',
        'element-sm-2': '9px',
        'element-sm-3': '12px',
        'element-md-1': '8px',
        'element-md-2': '12px',
        'element-md-3': '16px',
        'element-lg-1': '10px',
        'element-lg-2': '16px',
        'element-lg-3': '20px',
      },
    },
  }
)
