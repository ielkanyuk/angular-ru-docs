/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectorRef} from '../change_detection/change_detection';
import {Injector} from '../di/injector';
import {Type} from '../interface/type';

import {ElementRef} from './element_ref';
import {NgModuleRef} from './ng_module_factory';
import {ViewRef} from './view_ref';

/**
 * Представляет компонент, созданный с помощью `ComponentFactory`.
 * Предоставляет доступ к экземпляру компонента и связанным объектам
 * и предоставляет средства для уничтожения экземпляра.
 *
 * @publicApi
 */
export abstract class ComponentRef<C> {
  /**
   * The host or anchor [element](guide/glossary#element) for this component instance.
   */
  abstract get location(): ElementRef;

  /**
   * The [dependency injector](guide/glossary#injector) for this component instance.
   */
  abstract get injector(): Injector;

  /**
   * This component instance.
   */
  abstract get instance(): C;

  /**
   * The [host view](guide/glossary#view-tree) defined by the template
   * for this component instance.
   */
  abstract get hostView(): ViewRef;

  /**
   * The change detector for this component instance.
   */
  abstract get changeDetectorRef(): ChangeDetectorRef;

  /**
   * The type of this component (as created by a `ComponentFactory` class).
   */
  abstract get componentType(): Type<any>;

  /**
   * Destroys the component instance and all of the data structures associated with it.
   */
  abstract destroy(): void;

  /**
   * A lifecycle hook that provides additional developer-defined cleanup
   * functionality for the component.
   * @param callback A handler function that cleans up developer-defined data
   * associated with this component. Called when the `destroy()` method is invoked.
   */
  abstract onDestroy(callback: Function): void;
}

/**
 * Базовый класс для фабрики, которая может динамически создавать компонент.
 * Создайте фабрику для компонента данного типа с помощью `resolveComponentFactory()`.
 * Используйте полученный метод `ComponentFactory.create()` для создания компонента этого типа.
 *
 *  @see [Динамические компоненты](guide/dynamic-component-loader)
 *
 * @publicApi
 */
export abstract class ComponentFactory<C> {
  /**
   * The component's HTML selector.
   */
  abstract get selector(): string;
  /**
   * The type of component the factory will create.
   */
  abstract get componentType(): Type<any>;
  /**
   * Selector for all <ng-content> elements in the component.
   */
  abstract get ngContentSelectors(): string[];
  /**
   * The inputs of the component.
   */
  abstract get inputs(): {propName: string, templateName: string}[];
  /**
   * The outputs of the component.
   */
  abstract get outputs(): {propName: string, templateName: string}[];
  /**
   * Creates a new component.
   */
  abstract create(
      injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: string|any,
      ngModule?: NgModuleRef<any>): ComponentRef<C>;
}
