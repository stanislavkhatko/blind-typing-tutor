import { mount } from '@vue/test-utils';
import HeaderThemeModeSwitcher from './HeaderThemeModeSwitcher.vue';

describe('HeaderThemeModeSwitcher', () => {
    it('toggles theme correctly when clicked', async () => {
        const wrapper = mount(HeaderThemeModeSwitcher, {
            global: {
                mocks: {
                    $t: (msg) => msg
                }
            }
        });

        // Simulate clicking when darkMode is initially false
        await wrapper.find('svg').trigger('click');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(wrapper.vm.darkMode).toBe(true);
        expect(localStorage.getItem('darkMode')).toBe('true');

        // Simulate clicking when darkMode is initially true
        await wrapper.find('svg').trigger('click');
        expect(document.documentElement.classList.contains('dark')).toBe(false);
        expect(wrapper.vm.darkMode).toBe(false);
        expect(localStorage.getItem('darkMode')).toBe(null);
    });
});
