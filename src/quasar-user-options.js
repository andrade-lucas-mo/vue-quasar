import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css';

import {
	Quasar,
	QForm,
	QInput,
	QBtn,
	QSpace,
	QToolbar,
	QToolbarTitle,
	QList,
	QItem,
	QItemSection,
	QItemLabel,
	QDialog,
	QCard,
	QCardSection,
	QSpinner,
	Notify
} from 'quasar';

export default {
	config: {},
	components: {
		QForm,
		QInput,
		QBtn,
		QSpace,
		QToolbar,
		QToolbarTitle,
		QList,
		QItem,
		QItemSection,
		QItemLabel,
		QDialog,
		QCard,
		QSpinner,
		QCardSection
	},
	plugins: {
		Notify
	}
};
