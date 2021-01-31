import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 6px;
  margin-bottom: 24px;
  border-color: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0;
  }

  p{
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 25px;
  background-color: ${({ theme }) => theme.colors.primary};
  *{
    margin: 0;
  }
`;

Widget.Content = styled.div`
  margin: 5px;
  padding: 12px 16px 16px 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.mainBg};
  & > *::first-child {
    margin-top: 0;
  }

  & > *::last-child {
    margin-bottom: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  b {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

Widget.Scroll = styled.div`
  padding: 2.5px 5px 2.5px 0px ;
  height:200px;
  overflow-y: auto;
`;

Widget.Topic = styled.a`
outline: 0;
text-decoration: none;
text-align: left;
color: ${({ theme }) => theme.colors.contrastText};
background-color: ${({ theme }) => `${theme.colors.primary}40`};
padding: 10px;
margin-bottom: 8px;
cursor: pointer;
border-radius: ${({ theme }) => theme.borderRadius};
transition: .3s;
display: block;
width: 100%;

&:hover,
&:focus {
  opacity: .5;
}
`;

export default Widget;