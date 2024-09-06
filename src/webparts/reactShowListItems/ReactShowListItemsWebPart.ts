import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactShowListItemsWebPartStrings';
import ReactShowListItems from './components/ReactShowListItems';
import { IReactShowListItemsProps } from './components/IReactShowListItemsProps';

export interface IReactShowListItemsWebPartProps {
  description: string;
}

export default class ReactShowListItemsWebPart extends BaseClientSideWebPart<IReactShowListItemsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactShowListItemsProps > = React.createElement(
      ReactShowListItems,
      {
        description: this.properties.description,
        websiteurl: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
