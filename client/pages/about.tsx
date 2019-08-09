import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import withData from '../lib/apollo';


const BOOKS_QUERY = gql`
{
  books{
    title
  }
}`

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Material-UI
      </MuiLink>
      {' team.'}
    </Typography>
  );
}
const BooksComponent = (props: any) => {
  console.log('book props', props);
  const { loading, error, data } = useQuery(BOOKS_QUERY);
  if (loading) return 'loading';
  if (error) return 'there was an error';
  if (data) {
    console.log(data);
    return data.books.map((book: {title: string}) => <div key={book.title}>{book.title}</div>);
  }
};
export default withData((props: any) => {
  console.log(props);
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <BooksComponent />
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js with TypeScript example
        </Typography>
        <Link href="/">Go to the main page</Link>
        <ProTip />
        <MadeWithLove />
      </Box>
    </Container>
  );
});
