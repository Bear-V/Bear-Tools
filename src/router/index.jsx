import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import routes from './routes.js';

export default function Routes() {
  return useRoutes(renderRoutes(routes));
}

function renderRoutes(routes) {
  return routes.map(item => {
    let res = { ...item };
    if (!item.path) return;
    if (item.component) {
      const Component = React.lazy(item.component);
      res.element = (
        <React.Suspense>
          <BeforeEach route={item}>
            <Component />
          </BeforeEach>
        </React.Suspense>
      );
    }

    // children
    if (item.children) {
      console.log(item.children);
      res.children = renderRoutes(item.children);
    }

    // 重定向
    if (item.redirect) {
      res.element = <Navigate to={item.redirect} replace />;
    }

    return res;
  });
}

function BeforeEach({ route, children }) {
  console.log(route)
  console.log(children)
  if (route && route.meta && route.meta.title) {
    document.title = route.meta.title;
  }
  if (route && route.meta && route.meta.needLogin) {
    // 看是否登录
    // const navigate = useNavigate();
    // navigate('/login');
  }

  return <div className="frame">{children}</div>;
}
