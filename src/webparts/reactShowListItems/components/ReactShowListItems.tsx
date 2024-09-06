import * as React from "react";
import styles from "./ReactShowListItems.module.scss";
import { IReactShowListItemsProps } from "./IReactShowListItemsProps";
import { escape } from "@microsoft/sp-lodash-subset";

import * as jquery from "jquery";

export interface IReactShowListItemsState {
  listitems: [
    {
      Title: "";
      ID: "";
      SoftwareName: "";
    }
  ];
}

export default class ReactShowListItems extends React.Component<
  IReactShowListItemsProps,
  IReactShowListItemsState
> {
  static siteurl: string = "";
  public constructor(
    props: IReactShowListItemsProps,
    state: IReactShowListItemsState
  ) {
    super(props);
    this.state = {
      listitems: [
        {
          Title: "",
          ID: "",
          SoftwareName: "",
        },
      ],
    };
    ReactShowListItems.siteurl = this.props.websiteurl;
  }

  public componentDidMount(): void {
    let reactconetexthandler = this;
    jquery.ajax({
      url:
        ReactShowListItems.siteurl +
        "/_api/web/lists/getbytitle('SoftwareCatalog')/items",
      type: "GET",
      headers: {
        accept: "application/json;odata=verbose",
        // "content-type": "application/json;odata=verbose",
        // "odata-version": "3.0",
      },
      success: function (resultData) {
        reactconetexthandler.setState({ listitems: resultData.d.results });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      },
    });
  }

  public render(): React.ReactElement<IReactShowListItemsProps> {
    return (
      <div className={styles.reactShowListItems}>
        <table className={styles.row}>
          {this.state.listitems.map(function (listitem, listitemkey) {
            let fullurl: string = `${ReactShowListItems.siteurl}/lists/MirosoftCatalog/DispForm.aspx?ID=${listitem.ID}`;
            return (
              <tr>
                <td>
                  <a href={fullurl} className={styles.label}>
                    {listitem.Title}
                  </a>
                </td>
                <td>
                  <a href={fullurl} className={styles.label}>
                    {listitem.ID}
                  </a>
                </td>
                <a href={fullurl} className={styles.label}>
                  {listitem.SoftwareName}
                </a>
              </tr>
            );
          })}
        </table>
        <ol>
          {this.state.listitems.map(function (listitem, listitemkey) {
            let fullurl: string = `${ReactShowListItems.siteurl}/lists/MirosoftCatalog/DispForm.aspx?ID=${listitem.ID}`;
            return (
              <li>
                <a href={fullurl} className={styles.label}>
                  <span>{listitem.Title}</span>,<span>{listitem.ID}</span>,
                  <span>{listitem.SoftwareName}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
}
