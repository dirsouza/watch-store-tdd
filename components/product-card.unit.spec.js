import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';
import { makeServer } from '@/miragejs/server';

describe('ProductCard.vue - unit', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  function factory() {
    const product = server.create('product', {
      title: 'Wristwatch',
      price: '22.00',
      image:
        'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    });
    const wrapper = mount(ProductCard, {
      propsData: {
        product,
      },
    });

    return {
      product,
      wrapper,
    };
  }

  it('should mount the component', () => {
    const { wrapper } = factory();

    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Wristwatch');
    expect(wrapper.text()).toContain('22.00');
  });

  it('should emit the event addToCart with product object when button gets clicked', async () => {
    const { wrapper, product } = factory();

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().addToCart).toBeTruthy();
    expect(wrapper.emitted().addToCart.length).toBe(1);
    expect(wrapper.emitted().addToCart[0][0]).toEqual({ product });
  });
});
