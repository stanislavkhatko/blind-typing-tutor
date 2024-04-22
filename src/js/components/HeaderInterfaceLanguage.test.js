import { mount } from '@vue/test-utils';
import HeaderInterfaceLanguage from './HeaderInterfaceLanguage.vue';

describe('HeaderInterfaceLanguage', () => {
    it('sets locale in localStorage when select value changes', async () => {
        const wrapper = mount(HeaderInterfaceLanguage, {
            global: {
                mocks: {
                    $i18n: {
                        locale: () => {}
                    },
                }
            }
        });
        const select = wrapper.find('select');

        // Simulate changing select value to 'uk'
        await select.setValue('uk');
        expect(localStorage.getItem('locale')).toBe('uk');

        // Simulate changing select value to 'en'
        await select.setValue('en');
        expect(localStorage.getItem('locale')).toBe('en');
    });
});
