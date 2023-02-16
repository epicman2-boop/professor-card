import { html } from 'lit';
import '../src/professor-card.js';

export default {
  title: 'ProfessorCard',
  component: 'professor-card',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <professor-card
      style="--professor-card-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </professor-card>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
