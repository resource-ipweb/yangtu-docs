import {createPortal} from 'react-dom';
import {useCallback, useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import type {ImgHTMLAttributes, KeyboardEvent} from 'react';
import styles from './styles.module.css';

type ZoomableImageProps = ImgHTMLAttributes<HTMLImageElement>;

/**
 * 文档内可点击放大的图片组件，点击后在全屏 Lightbox 中查看原图。
 */
export default function ZoomableImage(props: ZoomableImageProps) {
  const {i18n} = useDocusaurusContext();
  const [open, setOpen] = useState(false);
  const closeLabel = i18n.currentLocale === 'zh' ? '关闭' : 'Close';
  const {width, height, style, className, ...imageProps} = props;

  /** 关闭 Lightbox 并恢复页面滚动。 */
  const closeLightbox = useCallback(() => {
    setOpen(false);
  }, []);

  /** 打开 Lightbox。 */
  const openLightbox = useCallback(() => {
    setOpen(true);
  }, []);

  /** 键盘 Enter / Space 触发放大。 */
  function handleImageKeyDown(event: KeyboardEvent<HTMLImageElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox();
    }
  }

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open, closeLightbox]);

  const lightbox =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div
            className={styles.lightbox}
            role="dialog"
            aria-modal="true"
            aria-label={props.alt ?? closeLabel}
            onClick={closeLightbox}>
            <button
              type="button"
              className={styles.closeButton}
              aria-label={closeLabel}
              onClick={closeLightbox}>
              ×
            </button>
            <img
              {...imageProps}
              className={styles.lightboxImage}
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <img
        {...imageProps}
        className={clsx(className, styles.zoomableImage)}
        onClick={openLightbox}
        onKeyDown={handleImageKeyDown}
        role="button"
        tabIndex={0}
        aria-label={
          props.alt
            ? `${props.alt} (${i18n.currentLocale === 'zh' ? '点击放大' : 'click to zoom'})`
            : undefined
        }
      />
      {lightbox}
    </>
  );
}
