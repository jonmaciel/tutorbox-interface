import React from 'react';
import {
    Grid
} from 'material-ui';
import { Link } from 'react-router-dom';
import {
    RegularCard, Table, ItemGrid
} from 'components';

class TableList extends React.Component{
    render(){
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        cardTitle="Vídeos"
                        headerColor="blue"
                        cardSubtitle="Aqui estão seus vídeos em rascunho"
                        content={
                            <Table
                                tableHeaderColor="primary"
                                tableHead={['Title', 'Situação', '']}
                                tableData={[
                                    ['Video 1', 'Rascunho', <Link to="/video/1">Editar</Link>],
                                    ['Video 2', 'Rascunho', <Link to="/video/2">Editar</Link>]
                                ]}
                            />
                        }
                    />
                </ItemGrid>
            </Grid>
        );
    }
}

export default TableList;
