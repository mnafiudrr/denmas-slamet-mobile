let loading: any;

function useRefLoading(ref: any) {
  loading = ref;
}

function showLoading(isShow: boolean) {
  loading.showLoading(isShow);
}

// eslint-disable-next-line @typescript-eslint/object-curly-spacing
export { useRefLoading, showLoading };
