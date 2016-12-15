import React, { PureComponent } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Header from './Header';
import ListRow from './ListRow';
import Masthead from '../masthead';
import Pagination from '../pagination';
import Search from '../search';

const mockBodyData = [
	{
		firstName: 'bob',
		lastName: 'ross',
		avatar: 'https://pbs.twimg.com/profile_images/659846506678124544/qptu8mfw.jpg',
	},
	{
		firstName: 'ragnar',
		lastName: 'lodbrok',
		avatar: 'https://pbs.twimg.com/profile_images/659846506678124544/qptu8mfw.jpg',
	},
	{
		firstName: 'rachel',
		lastName: 'rae',
		avatar: 'https://pbs.twimg.com/profile_images/659846506678124544/qptu8mfw.jpg',
	},
	{
		firstName: 'guy',
		lastName: 'fieri',
	},
];

const mockHeaderData = [
	{
		label: 'first name',
		key: 'firstName',
		sortable: true,
		searchable: true,
	},
	{
		label: 'last name',
		key: 'lastName',
		sortable: true,
		searchable: true,
	},
];

const mockPageData = [
	{ 'hasNextPage': true },
	{ 'hasPreviousPage': false },
	// { 'startCursor': 'YXJyYXljb25uZWN0aW9uJDU3MSQw' },
	// { 'endCursor': 'YXJyYXljb25uZWN0aW9uJDUwMyQxNA==' },
];


// eslint-disable-next-line react/prefer-stateless-function
export default class ReactMuiTable extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			tableName: 'Users',
			numRows: 15,
			currentPage: 1,
			itemsSelected: [],
		};

		this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
		this.changeNumRows = this.changeNumRows.bind(this);
		this.checkAllRows = this.checkAllRows.bind(this);
		this.uncheckAllRows = this.uncheckAllRows.bind(this);
		this.checkRow = this.checkRow.bind(this);
		this.uncheckRow = this.uncheckRow.bind(this);
		this.deleteRecords = this.deleteRecords.bind(this);
	}

	handleNextPage() {
		const { nextPage, pageData } = this.props;

		if(nextPage) {
			// TODO: What data needs passed here?
			pageData.hasNextPage ? nextPage() : '';
		} else {
			console.warn('There is no nextPage function passed down as props.');
		}
  }

  handlePreviousPage(pageNum) {
		const { previousPage, pageData } = this.props;

		if(previousPage) {
			// TODO: What data needs passed here?
			pageData.hasPreviousPage ? previousPage() : '';
		} else {
			console.warn('There is no previousPage function passed down as props.');
		}
  }

	changeNumRows(numRows) {
		if(numRows !== this.state.numRows) {
			// TODO: run func from props to update query for new numRows

			this.setState({
				numRows: numRows
			});
		}
	}

	checkAllRows() {
		return 'check all rows';
	}

	uncheckAllRows() {
		return 'uncheck all rows';
	}

	checkRow () {
		return 'check single row';
	}

	uncheckRow() {
		return 'uncheck single row';
	}

	deleteRecords() {
		const { deleteConfirmation } = this.props;
		const { itemsSelected } = this.state;

		if(deleteConfirmation) {
			// expecting confirmation of delete records to pass new set of props down for table data
			deleteConfirmation(itemsSelected);

			// flush out itemsSelected from local state
			this.setState({ itemsSelected: [] });
		} else {
			console.warn('There is no deleteConfirmation function passed down as props.');
		}
	}

  render() {
		// While developing, use mock data until figuring out a better way to handle dev vrs prod
		let headerData = !this.props.headerData ? mockHeaderData : this.props.headerData;
		let bodyData = !this.props.bodyData ? mockBodyData : this.props.bodyData;
		let pageData = !this.props.pageData ? mockPageData : this.props.pageData;

    return (
			<MuiThemeProvider>
				<span>
					{Search({ tableName: this.state.tableName })}
					<Paper zDepth={2}>
			      <List>
							{Masthead({ itemsSelected: this.state.itemsSelected, deleteRecords: this.deleteRecords })}
							{Header(headerData)}
							{bodyData.map((data, i) =>
								<span key={i}>
									<ListRow data={data} />
									<Divider />
								</span>
							)}
			        <Pagination
								currentPage={this.state.currentPage}
								numRows={this.state.numRows}
								pageData={pageData}
								changeNumRows={this.changeNumRows}
								handleNextPage={this.handleNextPage}
								handlePreviousPage={this.handlePreviousPage} />
			      </List>
					</Paper>
				</span>
			</MuiThemeProvider>
    );
  }
}
