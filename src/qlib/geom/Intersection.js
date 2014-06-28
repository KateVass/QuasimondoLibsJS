/*
* Intersection
*
* Copyright (c) 2013 Mario Klingemann
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

// namespace:
window["qlib"] = window.qlib || {};

(function() {

var Intersection = function() {
	this.status = qlib.Intersection.NO_INTERSECTION;
	this.points = [];
}

Intersection.SQUARED_SNAP_DISTANCE = 1e-15;

Intersection.INTERSECTION = "INTERSECTION";
Intersection.NO_INTERSECTION = "NO INTERSECTION";
Intersection.COINCIDENT = "COINCIDENT";
Intersection.PARALLEL = "PARALLEL";
Intersection.INSIDE = "INSIDE";
Intersection.OUTSIDE = "OUTSIDE";
Intersection.TANGENT = "TANGENT";


Intersection.intersect = function( shape1, shape2 ) 
{
	switch(  shape1.type + shape2.type )
	{
		case "CircleCircle":
			return new qlib.Intersection().circle_circle( shape1, shape2 );
			break;
		case "Bezier2Bezier2":
			return new qlib.Intersection().bezier2_bezier2( shape1, shape2 );
		break;
		case "Bezier2LineSegment":
			return new qlib.Intersection().bezier2_line( shape1, shape2 );
		break;
		case "LineSegmentBezier2":
			return new qlib.Intersection().bezier2_line( shape2, shape1 );
		break;
		case "Bezier2Ellipse":
			return new qlib.Intersection().bezier2_ellipse( shape1, shape2 );
		break;
		case "EllipseBezier2":
			return new qlib.Intersection().bezier2_ellipse( shape2, shape1 );
		break;
		case "LineSegmentLineSegment":
			return new qlib.Intersection().line_line( shape1, shape2 );
		break;
		case "EllipseLineSegment":
			return new qlib.Intersection().ellipse_line( shape1, shape2 );
		break;
		case "LineSegmentEllipse":
			return new qlib.Intersection().ellipse_line( shape2, shape1 );
		break;
		case "EllipseEllipse":
			return new qlib.Intersection().ellipse_ellipse( shape1, shape2 );
		break;
		case "CircleLineSegment":
			return new qlib.Intersection().circle_line( shape1, shape2 );
			break;
		case "LineSegmentCircle":
			return new qlib.Intersection().circle_line( shape2, shape1 );
			break;
		case "Bezier2Bezier3":
			return new qlib.Intersection().bezier2_bezier3( shape1, shape2 );
			break;
		case "Bezier3Bezier2":
			return new qlib.Intersection().bezier2_bezier3( shape2, shape1 );
			break;
		case "Bezier3Bezier3":
			return new qlib.Intersection().bezier3_bezier3( shape2, shape1 );
			break;
		case "Bezier3LineSegment":
			return new qlib.Intersection().bezier3_line( shape1, shape2 );
			break;
		case "LineSegmentBezier3":
			return new qlib.Intersection().bezier3_line( shape2, shape1 );
			break;
		case "TriangleLineSegment":
			return new qlib.Intersection().line_triangle( shape2, shape1 );
			break;
		case "LineSegmentTriangle":
			return new qlib.Intersection().line_triangle( shape1, shape2 );
			break;
		case "PolygonLineSegment":
			return new qlib.Intersection().line_polygon( shape2, shape1 );
			break;
		case "LineSegmentPolygon":
			return new qlib.Intersection().line_polygon( shape1, shape2 );
			break;
		case "ConvexPolygonLineSegment":
			return new qlib.Intersection().line_convexPolygon( shape2, shape1 );
			break;
		case "ConvexPolygonConvexPolygon":
			return new qlib.Intersection().convexPolygon_convexPolygon( shape2, shape1 );
			break;
		case "LineSegmentConvexPolygon":
			return new qlib.Intersection().line_convexPolygon( shape1, shape2 );
			break;
		case "LineSegmentMixedPath":
			return new qlib.Intersection().line_mixedPath( shape1, shape2 );
			break;
		case "MixedPathLineSegment":
			return new qlib.Intersection().line_mixedPath(shape2, shape1 );
			break;
		case "LineSegmentLinearPath":
			return new qlib.Intersection().line_linearPath( shape1, shape2 );
			break;
		case "LinearPathLineSegment":
			return new qlib.Intersection().line_linearPath(shape2, shape1 );
			break;	
			
		case "Bezier2MixedPath":
			return new qlib.Intersection().bezier2_mixedPath( shape1, shape2 );
			break;
		case "MixedPathBezier2":
			return new qlib.Intersection().bezier2_mixedPath(shape2, shape1 );
			break;
		case "Bezier3MixedPath":
			return new qlib.Intersection().bezier3_mixedPath( shape1, shape2 );
			break;
		case "MixedPathBezier3":
			return new qlib.Intersection().bezier3_mixedPath(shape2, shape1 );
			break;
			
		case "PolygonPolygon":
			return new qlib.Intersection().polygon_polygon( shape2, shape1 );
			break;
		case "ConvexPolygonPolygon":
			return new qlib.Intersection().convexPolygon_polygon( shape1, shape2 );
			break;
		case "PolygonConvexPolygon":
			return new qlib.Intersection().convexPolygon_polygon( shape2, shape1 );
			break;
		case "CompoundShapeLineSegment":
			return new qlib.Intersection().compoundShape_line( shape1, shape2 );
			break;
		case "LineSegmentCompoundShape":
			return new qlib.Intersection().compoundShape_line( shape2, shape1 );
			break;
		case "CompoundShapeTriangle":
			return new qlib.Intersection().compoundShape_triangle( shape1, shape2 );
			break;
		case "TriangleCompoundShape":
			return new qlib.Intersection().compoundShape_triangle( shape2, shape1  );
			break;
		case "CompoundShapePolygon":
			return new qlib.Intersection().compoundShape_polygon( shape1, shape2 );
			break;
		case "PolygonCompoundShape":
			return new qlib.Intersection().compoundShape_polygon( shape2, shape1  );
			break;
		case "CompoundShapeCompoundShape":
			return new qlib.Intersection().compoundShape_compoundShape( shape1, shape2 );
			break;
		case "GeometricCompositeLineSegment":
			return new qlib.Intersection().geometricComposite_line( shape1, shape2 );
			break;
		case "LineSegmentGeometricComposite":
			return new qlib.Intersection().geometricComposite_line( shape2, shape1 );
			break;
		case "PolygonTriangle":
			return new qlib.Intersection().polygon_triangle( shape1, shape2  );
			break;
		case "TrianglePolygon":
			return new qlib.Intersection().polygon_triangle( shape2, shape1  );
			break;
		case "ConvexPolygonCircle":
			return new qlib.Intersection().circle_convexPolygon( shape2, shape1 );
			break;
		case "CircleConvexPolygon":
			return new qlib.Intersection().circle_convexPolygon( shape1, shape2 );
			break;
		case "PolygonCircle":
			return new qlib.Intersection().circle_polygon( shape2, shape1 );
			break;
		case "CirclePolygon":
			return new qlib.Intersection().circle_polygon( shape1, shape2 );
			break;
	}
	return null;
}


var p = Intersection.prototype;
	
// public properties:

	p.appendPoint = function( p )
	{
		for ( var i = this.points.length; --i > -1; )
		{
			if ( this.points[i].squaredDistanceToVector( p ) < Intersection.SQUARED_SNAP_DISTANCE ) return;
		}
		this.points.push(p);
	}
	
	p.circle_line = function( c, l )
	{
		var a = (l.p2.x-l.p1.x)*(l.p2.x-l.p1.x)+(l.p2.y-l.p1.y)*(l.p2.y-l.p1.y);
		var b = 2*((l.p2.x-l.p1.x)*(l.p1.x-c.c.x)+(l.p2.y-l.p1.y)*(l.p1.y-c.c.y));
		var cc = c.c.x * c.c.x + c.c.y * c.c.y + l.p1.x * l.p1.x + l.p1.y * l.p1.y - 2 *( c.c.x * l.p1.x + c.c.y * l.p1.y ) - c.r * c.r;
		var deter = b * b - 4 * a * cc;
		
		if (deter<0) 
		{
			status = qlib.Intersection.OUTSIDE;
		} else if (deter == 0) 
		{
			status = qlib.Intersection.TANGENT;
		} else 
		{
			var e = Math.sqrt(deter);
			var u1 = (-b+e)/(2*a);
			var u2 = (-b-e)/(2*a);
			if (((u1<0 && l.p1_end) || (u1>1 && l.p2_end)) && ((u2<0 && l.p1_end) || (u2>1 && l.p2_end))) 
			{
				if ((u1<0 && u2<0) || (u1>1 && u2>1)) 
				{
					status = qlib.Intersection.OUTSIDE;
				} else {
					status = qlib.Intersection.INSIDE;
				}
			} else 
			{
				status = qlib.Intersection.INTERSECTION;
				if ((0<=u1 || !l.p1_end) && (u1<=1 || !l.p2_end)) 
				{
					this.appendPoint(l.p1.getLerp(l.p2, u1));
				}
				if ((0<=u2 || !l.p1_end) && (u2<=1  || !l.p2_end)) {
					this.appendPoint(l.p1.getLerp(l.p2, u2));
				}
			}
		}
		return this;
	};
		
	p.circle_circle = function(c1, c2 )
	{
		var r_max = c1.r+c2.r;
		var r_min = Math.abs(c1.r-c2.r);
		var c_dist = c1.c.distanceToVector( c2.c );
		
		if (c_dist == 0 && r_min == 0) {
			this.status = qlib.Intersection.COINCIDENT;
		} else if (c_dist>r_max) {
			this.status = qlib.Intersection.OUTSIDE;
		} else if (c_dist<r_min) {
			this.status = qlib.Intersection.INSIDE;
		} else {
			this.status = qlib.Intersection.INTERSECTION;
			var a = (c1.r*c1.r-c2.r*c2.r+c_dist*c_dist)/(2*c_dist);
			if ( a > c1.r ) a = c1.r;
			var h = Math.sqrt(c1.r*c1.r-a*a);
			var p = c1.c.getLerp(c2.c, a/c_dist);
			var b = h / c_dist;
			this.appendPoint(new qlib.Vector2(p.x-b*(c2.c.y-c1.c.y), p.y+b*(c2.c.x-c1.c.x)));
			this.appendPoint(new qlib.Vector2(p.x+b*(c2.c.y-c1.c.y), p.y-b*(c2.c.x-c1.c.x)));
		}
		return this;
	};
	
	p.bezier2_bezier2 = function( bz1, bz2)
	{
		var TOLERANCE = 1e-4;
		
		var a1 = bz1.p1;
		var a2 = bz1.c;
		var a3 = bz1.p2;
		var b1 = bz2.p1;
		var b2 = bz2.c;
		var b3 = bz2.p2;
		
		var va, vb;
		va = a2.getMultiply(-2);
		var c12=a1.getPlus(va.getPlus(a3));
		va = a1.getMultiply(-2);
		vb = a2.getMultiply(2);
		var c11 = va.getPlus(vb);
		var c10 = new qlib.Vector2(a1.x,a1.y);
		va = b2.getMultiply(-2);
		var c22 = b1.getPlus(va.getPlus(b3));
		va = b1.getMultiply(-2);
		vb = b2.getMultiply(2);
		var c21 = va.getPlus(vb);
		var c20 = new qlib.Vector2(b1.x,b1.y);
		
		var a = c12.x*c11.y-c11.x*c12.y;
		var b = c22.x*c11.y-c11.x*c22.y;
		var c = c21.x*c11.y-c11.x*c21.y;
		var d = c11.x*(c10.y-c20.y)+c11.y*(-c10.x+c20.x);
		var e = c22.x*c12.y-c12.x*c22.y;
		var f = c21.x*c12.y-c12.x*c21.y;
		var g = c12.x*(c10.y-c20.y)+c12.y*(-c10.x+c20.x);
		
		var poly = new qlib.Polynomial( [-e*e,-2*e*f,a*b-f*f-2*e*g,a*c-2*f*g,a*d-g*g]);
		var roots= poly.getRoots();
		
		for( var i = 0; i < roots.length;i++)
		{
			var s = roots[i];
			if(0<=s&&s<=1)
			{
				var xRoots = new qlib.Polynomial([-c12.x,-c11.x,-c10.x+c20.x+s*c21.x+s*s*c22.x]).getRoots();
				var yRoots = new qlib.Polynomial([-c12.y,-c11.y,-c10.y+c20.y+s*c21.y+s*s*c22.y]).getRoots();
				if( xRoots.length > 0 && yRoots.length > 0)
				{
					checkRoots:
					for(var j = 0; j < xRoots.length; j++ )
					{
						var xRoot = xRoots[j];
						if( 0 <= xRoot && xRoot <= 1 )
						{
							for(var k=0;k<yRoots.length;k++)
							{
								if(Math.abs(xRoot-yRoots[k])<TOLERANCE)
								{
									this.appendPoint(c22.getMultiply(s*s).plus(c21.getMultiply(s).plus(c20)));
									break checkRoots;
								}
							}
						}
					}
				}
			}
		}


		if ( this.points.length > 0 ) {
			this.status = qlib.Intersection.INTERSECTION;
		}
		
		return this;
	};
	
	p.bezier2_bezier3 = function( bz2, bz3)
	{
		return this.bezier3_bezier3( new qlib.Bezier3( bz2.p1,bz2.c,bz2.c,bz2.p2), bz3 );
	/*
	//this code is currently broken:
		var a1 = bz2.p1;
		var a2 = bz2.c;
		var a3 = bz2.p2;
		
		var b1 = bz3.p1;
		var b2 = bz3.c1;
		var b3 = bz3.c2;
		var b4 = bz3.p2;
		
		var a = a2.getMultiply(-2);
		var c12 = a1.getPlus(a.plus(a3));
		var c10 = a1.getMultiply(-2);
		var b = a2.getMultiply(2);
		var c11 = a.plus(b);
		a = b1.getMultiply(-1);
		b = b2.getMultiply(3);
		var c = b3.getMultiply(-3);
		var c23 = a.plus( b.plus(c.plus(b4)));
		a=b1.getMultiply(3);
		b=b2.getMultiply(-6);
		c=b3.getMultiply(3);
		var c22= a.plus(b.plus(c));
		a=b1.getMultiply(-3);
		var c20=b2.getMultiply(3);
		var c21=a.plus(b);
		
		var c10x2 = c10.x*c10.x;
		var c10y2 = c10.y*c10.y;
		var c11x2 = c11.x*c11.x;
		var c11y2 = c11.y*c11.y;
		var c12x2 = c12.x*c12.x;
		var c12y2 = c12.y*c12.y;
		var c20x2 = c20.x*c20.x;
		var c20y2 = c20.y*c20.y;
		var c21x2 = c21.x*c21.x;
		var c21y2 = c21.y*c21.y;
		var c22x2 = c22.x*c22.x;
		var c22y2 = c22.y*c22.y;
		var c23x2 = c23.x*c23.x;
		var c23y2 = c23.y*c23.y;
		var poly = new qlib.Polynomial([-2*c12.x*c12.y*c23.x*c23.y+c12x2*c23y2+c12y2*c23x2, -2*c12.x*c12.y*c22.x*c23.y-2*c12.x*c12.y*c22.y*c23.x+2*c12y2*c22.x*c23.x+2*c12x2*c22.y*c23.y, -2*c12.x*c21.x*c12.y*c23.y-2*c12.x*c12.y*c21.y*c23.x-2*c12.x*c12.y*c22.x*c22.y+2*c21.x*c12y2*c23.x+c12y2*c22x2+c12x2*(2*c21.y*c23.y+c22y2), 2*c10.x*c12.x*c12.y*c23.y+2*c10.y*c12.x*c12.y*c23.x+c11.x*c11.y*c12.x*c23.y+c11.x*c11.y*c12.y*c23.x-2*c20.x*c12.x*c12.y*c23.y-2*c12.x*c20.y*c12.y*c23.x-2*c12.x*c21.x*c12.y*c22.y-2*c12.x*c12.y*c21.y*c22.x-2*c10.x*c12y2*c23.x-2*c10.y*c12x2*c23.y+2*c20.x*c12y2*c23.x+2*c21.x*c12y2*c22.x-c11y2*c12.x*c23.x-c11x2*c12.y*c23.y+c12x2*(2*c20.y*c23.y+2*c21.y*c22.y), 2*c10.x*c12.x*c12.y*c22.y+2*c10.y*c12.x*c12.y*c22.x+c11.x*c11.y*c12.x*c22.y+c11.x*c11.y*c12.y*c22.x-2*c20.x*c12.x*c12.y*c22.y-2*c12.x*c20.y*c12.y*c22.x-2*c12.x*c21.x*c12.y*c21.y-2*c10.x*c12y2*c22.x-2*c10.y*c12x2*c22.y+2*c20.x*c12y2*c22.x-c11y2*c12.x*c22.x-c11x2*c12.y*c22.y+c21x2*c12y2+c12x2*(2*c20.y*c22.y+c21y2), 2*c10.x*c12.x*c12.y*c21.y+2*c10.y*c12.x*c21.x*c12.y+c11.x*c11.y*c12.x*c21.y+c11.x*c11.y*c21.x*c12.y-2*c20.x*c12.x*c12.y*c21.y-2*c12.x*c20.y*c21.x*c12.y-2*c10.x*c21.x*c12y2-2*c10.y*c12x2*c21.y+2*c20.x*c21.x*c12y2-c11y2*c12.x*c21.x-c11x2*c12.y*c21.y+2*c12x2*c20.y*c21.y, -2*c10.x*c10.y*c12.x*c12.y-c10.x*c11.x*c11.y*c12.y-c10.y*c11.x*c11.y*c12.x+2*c10.x*c12.x*c20.y*c12.y+2*c10.y*c20.x*c12.x*c12.y+c11.x*c20.x*c11.y*c12.y+c11.x*c11.y*c12.x*c20.y-2*c20.x*c12.x*c20.y*c12.y-2*c10.x*c20.x*c12y2+c10.x*c11y2*c12.x+c10.y*c11x2*c12.y-2*c10.y*c12x2*c20.y-c20.x*c11y2*c12.x-c11x2*c20.y*c12.y+c10x2*c12y2+c10y2*c12x2+c20x2*c12y2+c12x2*c20y2]);
		var roots = poly.getRootsInInterval(0, 1);
		var TOLERANCE = 1e-4;
		for (var i = 0; i < roots.length; i++) 
		{
			var s = roots[i];
			var xRoots = new qlib.Polynomial([c12.x, c11.x, c10.x-c20.x-s*c21.x-s*s*c22.x-s*s*s*c23.x]).getRoots();
			var yRoots = new qlib.Polynomial([c12.y, c11.y, c10.y-c20.y-s*c21.y-s*s*c22.y-s*s*s*c23.y]).getRoots();
			if (xRoots.length>0 && yRoots.length>0) 
			{
				//checkRoots:
				for (var j = 0; j< xRoots.length; j++) 
				{
					var xRoot = xRoots[j];
					if ( 0 <= xRoot && xRoot <= 1) 
					{
						for (var k = 0; k < yRoots.length; k++) 
						{
							if (Math.abs(xRoot-yRoots[k])<TOLERANCE) 
							{
								this.appendPoint(c23.getMultiply(s*s*s).plus(c22.getMultiply(s*s).plus(c21.getMultiply(s).plus(c20))));
								break;
								//checkRoots;
							}
						}
					}
				}
			}
		}
		if ( this.points.length>0) 
		{
			this.status = qlib.Intersection.INTERSECTION;
		}
		return this;
		*/
	};
	
	p.bezier3_bezier3 = function( bz1, bz2)
	{
		var a1 = bz1.p1;
		var a2 = bz1.c1;
		var a3 = bz1.c2;
		var a4 = bz1.p2;
		var b1 = bz2.p1;
		var b2 = bz2.c1;
		var b3 = bz2.c2;
		var b4 = bz2.p2;
		
		var ax,bx,cx,dx;
		var c13x,c12x,c11x,c10x;
		var c23x,c22x,c21x,c20x;
		
		var ay,by,cy,dy;
		var c13y,c12y,c11y,c10y;
		var c23y,c22y,c21y,c20y;
		
		ax = -a1.x;
		bx = 3 * a2.x;
		cx = -3 * a3.x;
		c13x = ax + bx + cx + a4.x;
		
		ay = -a1.y;
		by = 3 * a2.y;
		cy = -3 * a3.y;
		c13y = ay + by + cy + a4.y;
		
		ax = 3 * a1.x;
		bx = -6 * a2.x;
		cx = 3 * a3.x;
		c12x = ax + bx + cx;
		
		ay = 3 * a1.y;
		by = -6 * a2.y;
		cy = 3 * a3.y;
		c12y = ay + by + cy;
		
		ax = -3 * a1.x;
		bx = 3 * a2.x;
		c11x =  ax + bx;
		c10x =  a1.x;
		
		ay = -3 * a1.y;
		by = 3 * a2.y;
		c11y = ay + by;
		c10y =  a1.y;
		
		ax = -b1.x;
		bx = 3 * b2.x;
		cx = -3 * b3.x;
		c23x = ax + bx + cx + b4.x;
		
		ay = -b1.y;
		by = 3 * b2.y;
		cy = -3 * b3.y;
		c23y = ay + by + cy + b4.y;
		
		ax = 3 * b1.x;
		bx = -6 * b2.x;
		cx = 3 * b3.x;
		c22x = ax + bx + cx;
		
		ay = 3 * b1.y;
		by = -6 * b2.y;
		cy = 3 * b3.y;
		c22y = ay + by + cy;
		
		ax = -3 * b1.x;
		bx = 3 * b2.x;
		c21x =  ax + bx;
		c20x = b1.x;
		
		ay = -3 * b1.y;
		by = 3 * b2.y;
		c21y = ay + by;
		c20y = b1.y;
		
		
		var c10x2=c10x*c10x;
		var c10x3=c10x*c10x*c10x;
		var c10y2=c10y*c10y;
		var c10y3=c10y*c10y*c10y;
		var c11x2=c11x*c11x;
		var c11x3=c11x*c11x*c11x;
		var c11y2=c11y*c11y;
		var c11y3=c11y*c11y*c11y;
		var c12x2=c12x*c12x;
		var c12x3=c12x*c12x*c12x;
		var c12y2=c12y*c12y;
		var c12y3=c12y*c12y*c12y;
		var c13x2=c13x*c13x;
		var c13x3=c13x*c13x*c13x;
		var c13y2=c13y*c13y;
		var c13y3=c13y*c13y*c13y;
		var c20x2=c20x*c20x;
		var c20x3=c20x*c20x*c20x;
		var c20y2=c20y*c20y;
		var c20y3=c20y*c20y*c20y;
		var c21x2=c21x*c21x;
		var c21x3=c21x*c21x*c21x;
		var c21y2=c21y*c21y;
		var c22x2=c22x*c22x;
		var c22x3=c22x*c22x*c22x;
		var c22y2=c22y*c22y;
		var c23x2=c23x*c23x;
		var c23x3=c23x*c23x*c23x;
		var c23y2=c23y*c23y;
		var c23y3=c23y*c23y*c23y;
		
		var poly= new qlib.Polynomial([
				-c13x3*c23y3+c13y3*c23x3-3*c13x*c13y2*c23x2*c23y+3*c13x2*c13y*c23x*c23y2,
				-6*c13x*c22x*c13y2*c23x*c23y+6*c13x2*c13y*c22y*c23x*c23y+3*c22x*c13y3*c23x2-3*c13x3*c22y*c23y2-3*c13x*c13y2*c22y*c23x2+3*c13x2*c22x*c13y*c23y2,
				-6*c21x*c13x*c13y2*c23x*c23y-6*c13x*c22x*c13y2*c22y*c23x+6*c13x2*c22x*c13y*c22y*c23y+3*c21x*c13y3*c23x2+3*c22x2*c13y3*c23x+3*c21x*c13x2*c13y*c23y2-3*c13x*c21y*c13y2*c23x2-3*c13x*c22x2*c13y2*c23y+c13x2*c13y*c23x*(6*c21y*c23y+3*c22y2)+c13x3*(-c21y*c23y2-2*c22y2*c23y-c23y*(2*c21y*c23y+c22y2)),
				c11x*c12y*c13x*c13y*c23x*c23y-c11y*c12x*c13x*c13y*c23x*c23y+6*c21x*c22x*c13y3*c23x+3*c11x*c12x*c13x*c13y*c23y2+6*c10x*c13x*c13y2*c23x*c23y-3*c11x*c12x*c13y2*c23x*c23y-3*c11y*c12y*c13x*c13y*c23x2-6*c10y*c13x2*c13y*c23x*c23y-6*c20x*c13x*c13y2*c23x*c23y+3*c11y*c12y*c13x2*c23x*c23y-2*c12x*c12y2*c13x*c23x*c23y-6*c21x*c13x*c22x*c13y2*c23y-6*c21x*c13x*c13y2*c22y*c23x-6*c13x*c21y*c22x*c13y2*c23x+6*c21x*c13x2*c13y*c22y*c23y+2*c12x2*c12y*c13y*c23x*c23y+c22x3*c13y3-3*c10x*c13y3*c23x2+3*c10y*c13x3*c23y2+3*c20x*c13y3*c23x2+c12y3*c13x*c23x2-c12x3*c13y*c23y2-3*c10x*c13x2*c13y*c23y2+3*c10y*c13x*c13y2*c23x2-2*c11x*c12y*c13x2*c23y2+c11x*c12y*c13y2*c23x2-c11y*c12x*c13x2*c23y2+2*c11y*c12x*c13y2*c23x2+3*c20x*c13x2*c13y*c23y2-c12x*c12y2*c13y*c23x2-3*c20y*c13x*c13y2*c23x2+c12x2*c12y*c13x*c23y2-3*c13x*c22x2*c13y2*c22y+c13x2*c13y*c23x*(6*c20y*c23y+6*c21y*c22y)+c13x2*c22x*c13y*(6*c21y*c23y+3*c22y2)+c13x3*(-2*c21y*c22y*c23y-c20y*c23y2-c22y*(2*c21y*c23y+c22y2)-c23y*(2*c20y*c23y+2*c21y*c22y)),
				6*c11x*c12x*c13x*c13y*c22y*c23y+c11x*c12y*c13x*c22x*c13y*c23y+c11x*c12y*c13x*c13y*c22y*c23x-c11y*c12x*c13x*c22x*c13y*c23y-c11y*c12x*c13x*c13y*c22y*c23x-6*c11y*c12y*c13x*c22x*c13y*c23x-6*c10x*c22x*c13y3*c23x+6*c20x*c22x*c13y3*c23x+6*c10y*c13x3*c22y*c23y+2*c12y3*c13x*c22x*c23x-2*c12x3*c13y*c22y*c23y+6*c10x*c13x*c22x*c13y2*c23y+6*c10x*c13x*c13y2*c22y*c23x+6*c10y*c13x*c22x*c13y2*c23x-3*c11x*c12x*c22x*c13y2*c23y-3*c11x*c12x*c13y2*c22y*c23x+2*c11x*c12y*c22x*c13y2*c23x+4*c11y*c12x*c22x*c13y2*c23x-6*c10x*c13x2*c13y*c22y*c23y-6*c10y*c13x2*c22x*c13y*c23y-6*c10y*c13x2*c13y*c22y*c23x-4*c11x*c12y*c13x2*c22y*c23y-6*c20x*c13x*c22x*c13y2*c23y-6*c20x*c13x*c13y2*c22y*c23x-2*c11y*c12x*c13x2*c22y*c23y+3*c11y*c12y*c13x2*c22x*c23y+3*c11y*c12y*c13x2*c22y*c23x-2*c12x*c12y2*c13x*c22x*c23y-2*c12x*c12y2*c13x*c22y*c23x-2*c12x*c12y2*c22x*c13y*c23x-6*c20y*c13x*c22x*c13y2*c23x-6*c21x*c13x*c21y*c13y2*c23x-6*c21x*c13x*c22x*c13y2*c22y+6*c20x*c13x2*c13y*c22y*c23y+2*c12x2*c12y*c13x*c22y*c23y+2*c12x2*c12y*c22x*c13y*c23y+2*c12x2*c12y*c13y*c22y*c23x+3*c21x*c22x2*c13y3+3*c21x2*c13y3*c23x-3*c13x*c21y*c22x2*c13y2-3*c21x2*c13x*c13y2*c23y+c13x2*c22x*c13y*(6*c20y*c23y+6*c21y*c22y)+c13x2*c13y*c23x*(6*c20y*c22y+3*c21y2)+c21x*c13x2*c13y*(6*c21y*c23y+3*c22y2)+c13x3*(-2*c20y*c22y*c23y-c23y*(2*c20y*c22y+c21y2)-c21y*(2*c21y*c23y+c22y2)-c22y*(2*c20y*c23y+2*c21y*c22y)),
				c11x*c21x*c12y*c13x*c13y*c23y+c11x*c12y*c13x*c21y*c13y*c23x+c11x*c12y*c13x*c22x*c13y*c22y-c11y*c12x*c21x*c13x*c13y*c23y-c11y*c12x*c13x*c21y*c13y*c23x-c11y*c12x*c13x*c22x*c13y*c22y-6*c11y*c21x*c12y*c13x*c13y*c23x-6*c10x*c21x*c13y3*c23x+6*c20x*c21x*c13y3*c23x+2*c21x*c12y3*c13x*c23x+6*c10x*c21x*c13x*c13y2*c23y+6*c10x*c13x*c21y*c13y2*c23x+6*c10x*c13x*c22x*c13y2*c22y+6*c10y*c21x*c13x*c13y2*c23x-3*c11x*c12x*c21x*c13y2*c23y-3*c11x*c12x*c21y*c13y2*c23x-3*c11x*c12x*c22x*c13y2*c22y+2*c11x*c21x*c12y*c13y2*c23x+4*c11y*c12x*c21x*c13y2*c23x-6*c10y*c21x*c13x2*c13y*c23y-6*c10y*c13x2*c21y*c13y*c23x-6*c10y*c13x2*c22x*c13y*c22y-6*c20x*c21x*c13x*c13y2*c23y-6*c20x*c13x*c21y*c13y2*c23x-6*c20x*c13x*c22x*c13y2*c22y+3*c11y*c21x*c12y*c13x2*c23y-3*c11y*c12y*c13x*c22x2*c13y+3*c11y*c12y*c13x2*c21y*c23x+3*c11y*c12y*c13x2*c22x*c22y-2*c12x*c21x*c12y2*c13x*c23y-2*c12x*c21x*c12y2*c13y*c23x-2*c12x*c12y2*c13x*c21y*c23x-2*c12x*c12y2*c13x*c22x*c22y-6*c20y*c21x*c13x*c13y2*c23x-6*c21x*c13x*c21y*c22x*c13y2+6*c20y*c13x2*c21y*c13y*c23x+2*c12x2*c21x*c12y*c13y*c23y+2*c12x2*c12y*c21y*c13y*c23x+2*c12x2*c12y*c22x*c13y*c22y-3*c10x*c22x2*c13y3+3*c20x*c22x2*c13y3+3*c21x2*c22x*c13y3+c12y3*c13x*c22x2+3*c10y*c13x*c22x2*c13y2+c11x*c12y*c22x2*c13y2+2*c11y*c12x*c22x2*c13y2-c12x*c12y2*c22x2*c13y-3*c20y*c13x*c22x2*c13y2-3*c21x2*c13x*c13y2*c22y+c12x2*c12y*c13x*(2*c21y*c23y+c22y2)+c11x*c12x*c13x*c13y*(6*c21y*c23y+3*c22y2)+c21x*c13x2*c13y*(6*c20y*c23y+6*c21y*c22y)+c12x3*c13y*(-2*c21y*c23y-c22y2)+c10y*c13x3*(6*c21y*c23y+3*c22y2)+c11y*c12x*c13x2*(-2*c21y*c23y-c22y2)+c11x*c12y*c13x2*(-4*c21y*c23y-2*c22y2)+c10x*c13x2*c13y*(-6*c21y*c23y-3*c22y2)+c13x2*c22x*c13y*(6*c20y*c22y+3*c21y2)+c20x*c13x2*c13y*(6*c21y*c23y+3*c22y2)+c13x3*(-2*c20y*c21y*c23y-c22y*(2*c20y*c22y+c21y2)-c20y*(2*c21y*c23y+c22y2)-c21y*(2*c20y*c23y+2*c21y*c22y)),
				-c10x*c11x*c12y*c13x*c13y*c23y+c10x*c11y*c12x*c13x*c13y*c23y+6*c10x*c11y*c12y*c13x*c13y*c23x-6*c10y*c11x*c12x*c13x*c13y*c23y-c10y*c11x*c12y*c13x*c13y*c23x+c10y*c11y*c12x*c13x*c13y*c23x+c11x*c11y*c12x*c12y*c13x*c23y-c11x*c11y*c12x*c12y*c13y*c23x+c11x*c20x*c12y*c13x*c13y*c23y+c11x*c20y*c12y*c13x*c13y*c23x+c11x*c21x*c12y*c13x*c13y*c22y+c11x*c12y*c13x*c21y*c22x*c13y-c20x*c11y*c12x*c13x*c13y*c23y-6*c20x*c11y*c12y*c13x*c13y*c23x-c11y*c12x*c20y*c13x*c13y*c23x-c11y*c12x*c21x*c13x*c13y*c22y-c11y*c12x*c13x*c21y*c22x*c13y-6*c11y*c21x*c12y*c13x*c22x*c13y-6*c10x*c20x*c13y3*c23x-6*c10x*c21x*c22x*c13y3-2*c10x*c12y3*c13x*c23x+6*c20x*c21x*c22x*c13y3+2*c20x*c12y3*c13x*c23x+2*c21x*c12y3*c13x*c22x+2*c10y*c12x3*c13y*c23y-6*c10x*c10y*c13x*c13y2*c23x+3*c10x*c11x*c12x*c13y2*c23y-2*c10x*c11x*c12y*c13y2*c23x-4*c10x*c11y*c12x*c13y2*c23x+3*c10y*c11x*c12x*c13y2*c23x+6*c10x*c10y*c13x2*c13y*c23y+6*c10x*c20x*c13x*c13y2*c23y-3*c10x*c11y*c12y*c13x2*c23y+2*c10x*c12x*c12y2*c13x*c23y+2*c10x*c12x*c12y2*c13y*c23x+6*c10x*c20y*c13x*c13y2*c23x+6*c10x*c21x*c13x*c13y2*c22y+6*c10x*c13x*c21y*c22x*c13y2+4*c10y*c11x*c12y*c13x2*c23y+6*c10y*c20x*c13x*c13y2*c23x+2*c10y*c11y*c12x*c13x2*c23y-3*c10y*c11y*c12y*c13x2*c23x+2*c10y*c12x*c12y2*c13x*c23x+6*c10y*c21x*c13x*c22x*c13y2-3*c11x*c20x*c12x*c13y2*c23y+2*c11x*c20x*c12y*c13y2*c23x+c11x*c11y*c12y2*c13x*c23x-3*c11x*c12x*c20y*c13y2*c23x-3*c11x*c12x*c21x*c13y2*c22y-3*c11x*c12x*c21y*c22x*c13y2+2*c11x*c21x*c12y*c22x*c13y2+4*c20x*c11y*c12x*c13y2*c23x+4*c11y*c12x*c21x*c22x*c13y2-2*c10x*c12x2*c12y*c13y*c23y-6*c10y*c20x*c13x2*c13y*c23y-6*c10y*c20y*c13x2*c13y*c23x-6*c10y*c21x*c13x2*c13y*c22y-2*c10y*c12x2*c12y*c13x*c23y-2*c10y*c12x2*c12y*c13y*c23x-6*c10y*c13x2*c21y*c22x*c13y-c11x*c11y*c12x2*c13y*c23y-2*c11x*c11y2*c13x*c13y*c23x+3*c20x*c11y*c12y*c13x2*c23y-2*c20x*c12x*c12y2*c13x*c23y-2*c20x*c12x*c12y2*c13y*c23x-6*c20x*c20y*c13x*c13y2*c23x-6*c20x*c21x*c13x*c13y2*c22y-6*c20x*c13x*c21y*c22x*c13y2+3*c11y*c20y*c12y*c13x2*c23x+3*c11y*c21x*c12y*c13x2*c22y+3*c11y*c12y*c13x2*c21y*c22x-2*c12x*c20y*c12y2*c13x*c23x-2*c12x*c21x*c12y2*c13x*c22y-2*c12x*c21x*c12y2*c22x*c13y-2*c12x*c12y2*c13x*c21y*c22x-6*c20y*c21x*c13x*c22x*c13y2-c11y2*c12x*c12y*c13x*c23x+2*c20x*c12x2*c12y*c13y*c23y+6*c20y*c13x2*c21y*c22x*c13y+2*c11x2*c11y*c13x*c13y*c23y+c11x2*c12x*c12y*c13y*c23y+2*c12x2*c20y*c12y*c13y*c23x+2*c12x2*c21x*c12y*c13y*c22y+2*c12x2*c12y*c21y*c22x*c13y+c21x3*c13y3+3*c10x2*c13y3*c23x-3*c10y2*c13x3*c23y+3*c20x2*c13y3*c23x+c11y3*c13x2*c23x-c11x3*c13y2*c23y-c11x*c11y2*c13x2*c23y+c11x2*c11y*c13y2*c23x-3*c10x2*c13x*c13y2*c23y+3*c10y2*c13x2*c13y*c23x-c11x2*c12y2*c13x*c23y+c11y2*c12x2*c13y*c23x-3*c21x2*c13x*c21y*c13y2-3*c20x2*c13x*c13y2*c23y+3*c20y2*c13x2*c13y*c23x+c11x*c12x*c13x*c13y*(6*c20y*c23y+6*c21y*c22y)+c12x3*c13y*(-2*c20y*c23y-2*c21y*c22y)+c10y*c13x3*(6*c20y*c23y+6*c21y*c22y)+c11y*c12x*c13x2*(-2*c20y*c23y-2*c21y*c22y)+c12x2*c12y*c13x*(2*c20y*c23y+2*c21y*c22y)+c11x*c12y*c13x2*(-4*c20y*c23y-4*c21y*c22y)+c10x*c13x2*c13y*(-6*c20y*c23y-6*c21y*c22y)+c20x*c13x2*c13y*(6*c20y*c23y+6*c21y*c22y)+c21x*c13x2*c13y*(6*c20y*c22y+3*c21y2)+c13x3*(-2*c20y*c21y*c22y-c20y2*c23y-c21y*(2*c20y*c22y+c21y2)-c20y*(2*c20y*c23y+2*c21y*c22y)),
				-c10x*c11x*c12y*c13x*c13y*c22y+c10x*c11y*c12x*c13x*c13y*c22y+6*c10x*c11y*c12y*c13x*c22x*c13y-6*c10y*c11x*c12x*c13x*c13y*c22y-c10y*c11x*c12y*c13x*c22x*c13y+c10y*c11y*c12x*c13x*c22x*c13y+c11x*c11y*c12x*c12y*c13x*c22y-c11x*c11y*c12x*c12y*c22x*c13y+c11x*c20x*c12y*c13x*c13y*c22y+c11x*c20y*c12y*c13x*c22x*c13y+c11x*c21x*c12y*c13x*c21y*c13y-c20x*c11y*c12x*c13x*c13y*c22y-6*c20x*c11y*c12y*c13x*c22x*c13y-c11y*c12x*c20y*c13x*c22x*c13y-c11y*c12x*c21x*c13x*c21y*c13y-6*c10x*c20x*c22x*c13y3-2*c10x*c12y3*c13x*c22x+2*c20x*c12y3*c13x*c22x+2*c10y*c12x3*c13y*c22y-6*c10x*c10y*c13x*c22x*c13y2+3*c10x*c11x*c12x*c13y2*c22y-2*c10x*c11x*c12y*c22x*c13y2-4*c10x*c11y*c12x*c22x*c13y2+3*c10y*c11x*c12x*c22x*c13y2+6*c10x*c10y*c13x2*c13y*c22y+6*c10x*c20x*c13x*c13y2*c22y-3*c10x*c11y*c12y*c13x2*c22y+2*c10x*c12x*c12y2*c13x*c22y+2*c10x*c12x*c12y2*c22x*c13y+6*c10x*c20y*c13x*c22x*c13y2+6*c10x*c21x*c13x*c21y*c13y2+4*c10y*c11x*c12y*c13x2*c22y+6*c10y*c20x*c13x*c22x*c13y2+2*c10y*c11y*c12x*c13x2*c22y-3*c10y*c11y*c12y*c13x2*c22x+2*c10y*c12x*c12y2*c13x*c22x-3*c11x*c20x*c12x*c13y2*c22y+2*c11x*c20x*c12y*c22x*c13y2+c11x*c11y*c12y2*c13x*c22x-3*c11x*c12x*c20y*c22x*c13y2-3*c11x*c12x*c21x*c21y*c13y2+4*c20x*c11y*c12x*c22x*c13y2-2*c10x*c12x2*c12y*c13y*c22y-6*c10y*c20x*c13x2*c13y*c22y-6*c10y*c20y*c13x2*c22x*c13y-6*c10y*c21x*c13x2*c21y*c13y-2*c10y*c12x2*c12y*c13x*c22y-2*c10y*c12x2*c12y*c22x*c13y-c11x*c11y*c12x2*c13y*c22y-2*c11x*c11y2*c13x*c22x*c13y+3*c20x*c11y*c12y*c13x2*c22y-2*c20x*c12x*c12y2*c13x*c22y-2*c20x*c12x*c12y2*c22x*c13y-6*c20x*c20y*c13x*c22x*c13y2-6*c20x*c21x*c13x*c21y*c13y2+3*c11y*c20y*c12y*c13x2*c22x+3*c11y*c21x*c12y*c13x2*c21y-2*c12x*c20y*c12y2*c13x*c22x-2*c12x*c21x*c12y2*c13x*c21y-c11y2*c12x*c12y*c13x*c22x+2*c20x*c12x2*c12y*c13y*c22y-3*c11y*c21x2*c12y*c13x*c13y+6*c20y*c21x*c13x2*c21y*c13y+2*c11x2*c11y*c13x*c13y*c22y+c11x2*c12x*c12y*c13y*c22y+2*c12x2*c20y*c12y*c22x*c13y+2*c12x2*c21x*c12y*c21y*c13y-3*c10x*c21x2*c13y3+3*c20x*c21x2*c13y3+3*c10x2*c22x*c13y3-3*c10y2*c13x3*c22y+3*c20x2*c22x*c13y3+c21x2*c12y3*c13x+c11y3*c13x2*c22x-c11x3*c13y2*c22y+3*c10y*c21x2*c13x*c13y2-c11x*c11y2*c13x2*c22y+c11x*c21x2*c12y*c13y2+2*c11y*c12x*c21x2*c13y2+c11x2*c11y*c22x*c13y2-c12x*c21x2*c12y2*c13y-3*c20y*c21x2*c13x*c13y2-3*c10x2*c13x*c13y2*c22y+3*c10y2*c13x2*c22x*c13y-c11x2*c12y2*c13x*c22y+c11y2*c12x2*c22x*c13y-3*c20x2*c13x*c13y2*c22y+3*c20y2*c13x2*c22x*c13y+c12x2*c12y*c13x*(2*c20y*c22y+c21y2)+c11x*c12x*c13x*c13y*(6*c20y*c22y+3*c21y2)+c12x3*c13y*(-2*c20y*c22y-c21y2)+c10y*c13x3*(6*c20y*c22y+3*c21y2)+c11y*c12x*c13x2*(-2*c20y*c22y-c21y2)+c11x*c12y*c13x2*(-4*c20y*c22y-2*c21y2)+c10x*c13x2*c13y*(-6*c20y*c22y-3*c21y2)+c20x*c13x2*c13y*(6*c20y*c22y+3*c21y2)+c13x3*(-2*c20y*c21y2-c20y2*c22y-c20y*(2*c20y*c22y+c21y2)),
				-c10x*c11x*c12y*c13x*c21y*c13y+c10x*c11y*c12x*c13x*c21y*c13y+6*c10x*c11y*c21x*c12y*c13x*c13y-6*c10y*c11x*c12x*c13x*c21y*c13y-c10y*c11x*c21x*c12y*c13x*c13y+c10y*c11y*c12x*c21x*c13x*c13y-c11x*c11y*c12x*c21x*c12y*c13y+c11x*c11y*c12x*c12y*c13x*c21y+c11x*c20x*c12y*c13x*c21y*c13y+6*c11x*c12x*c20y*c13x*c21y*c13y+c11x*c20y*c21x*c12y*c13x*c13y-c20x*c11y*c12x*c13x*c21y*c13y-6*c20x*c11y*c21x*c12y*c13x*c13y-c11y*c12x*c20y*c21x*c13x*c13y-6*c10x*c20x*c21x*c13y3-2*c10x*c21x*c12y3*c13x+6*c10y*c20y*c13x3*c21y+2*c20x*c21x*c12y3*c13x+2*c10y*c12x3*c21y*c13y-2*c12x3*c20y*c21y*c13y-6*c10x*c10y*c21x*c13x*c13y2+3*c10x*c11x*c12x*c21y*c13y2-2*c10x*c11x*c21x*c12y*c13y2-4*c10x*c11y*c12x*c21x*c13y2+3*c10y*c11x*c12x*c21x*c13y2+6*c10x*c10y*c13x2*c21y*c13y+6*c10x*c20x*c13x*c21y*c13y2-3*c10x*c11y*c12y*c13x2*c21y+2*c10x*c12x*c21x*c12y2*c13y+2*c10x*c12x*c12y2*c13x*c21y+6*c10x*c20y*c21x*c13x*c13y2+4*c10y*c11x*c12y*c13x2*c21y+6*c10y*c20x*c21x*c13x*c13y2+2*c10y*c11y*c12x*c13x2*c21y-3*c10y*c11y*c21x*c12y*c13x2+2*c10y*c12x*c21x*c12y2*c13x-3*c11x*c20x*c12x*c21y*c13y2+2*c11x*c20x*c21x*c12y*c13y2+c11x*c11y*c21x*c12y2*c13x-3*c11x*c12x*c20y*c21x*c13y2+4*c20x*c11y*c12x*c21x*c13y2-6*c10x*c20y*c13x2*c21y*c13y-2*c10x*c12x2*c12y*c21y*c13y-6*c10y*c20x*c13x2*c21y*c13y-6*c10y*c20y*c21x*c13x2*c13y-2*c10y*c12x2*c21x*c12y*c13y-2*c10y*c12x2*c12y*c13x*c21y-c11x*c11y*c12x2*c21y*c13y-4*c11x*c20y*c12y*c13x2*c21y-2*c11x*c11y2*c21x*c13x*c13y+3*c20x*c11y*c12y*c13x2*c21y-2*c20x*c12x*c21x*c12y2*c13y-2*c20x*c12x*c12y2*c13x*c21y-6*c20x*c20y*c21x*c13x*c13y2-2*c11y*c12x*c20y*c13x2*c21y+3*c11y*c20y*c21x*c12y*c13x2-2*c12x*c20y*c21x*c12y2*c13x-c11y2*c12x*c21x*c12y*c13x+6*c20x*c20y*c13x2*c21y*c13y+2*c20x*c12x2*c12y*c21y*c13y+2*c11x2*c11y*c13x*c21y*c13y+c11x2*c12x*c12y*c21y*c13y+2*c12x2*c20y*c21x*c12y*c13y+2*c12x2*c20y*c12y*c13x*c21y+3*c10x2*c21x*c13y3-3*c10y2*c13x3*c21y+3*c20x2*c21x*c13y3+c11y3*c21x*c13x2-c11x3*c21y*c13y2-3*c20y2*c13x3*c21y-c11x*c11y2*c13x2*c21y+c11x2*c11y*c21x*c13y2-3*c10x2*c13x*c21y*c13y2+3*c10y2*c21x*c13x2*c13y-c11x2*c12y2*c13x*c21y+c11y2*c12x2*c21x*c13y-3*c20x2*c13x*c21y*c13y2+3*c20y2*c21x*c13x2*c13y,
				c10x*c10y*c11x*c12y*c13x*c13y-c10x*c10y*c11y*c12x*c13x*c13y+c10x*c11x*c11y*c12x*c12y*c13y-c10y*c11x*c11y*c12x*c12y*c13x-c10x*c11x*c20y*c12y*c13x*c13y+6*c10x*c20x*c11y*c12y*c13x*c13y+c10x*c11y*c12x*c20y*c13x*c13y-c10y*c11x*c20x*c12y*c13x*c13y-6*c10y*c11x*c12x*c20y*c13x*c13y+c10y*c20x*c11y*c12x*c13x*c13y-c11x*c20x*c11y*c12x*c12y*c13y+c11x*c11y*c12x*c20y*c12y*c13x+c11x*c20x*c20y*c12y*c13x*c13y-c20x*c11y*c12x*c20y*c13x*c13y-2*c10x*c20x*c12y3*c13x+2*c10y*c12x3*c20y*c13y-3*c10x*c10y*c11x*c12x*c13y2-6*c10x*c10y*c20x*c13x*c13y2+3*c10x*c10y*c11y*c12y*c13x2-2*c10x*c10y*c12x*c12y2*c13x-2*c10x*c11x*c20x*c12y*c13y2-c10x*c11x*c11y*c12y2*c13x+3*c10x*c11x*c12x*c20y*c13y2-4*c10x*c20x*c11y*c12x*c13y2+3*c10y*c11x*c20x*c12x*c13y2+6*c10x*c10y*c20y*c13x2*c13y+2*c10x*c10y*c12x2*c12y*c13y+2*c10x*c11x*c11y2*c13x*c13y+2*c10x*c20x*c12x*c12y2*c13y+6*c10x*c20x*c20y*c13x*c13y2-3*c10x*c11y*c20y*c12y*c13x2+2*c10x*c12x*c20y*c12y2*c13x+c10x*c11y2*c12x*c12y*c13x+c10y*c11x*c11y*c12x2*c13y+4*c10y*c11x*c20y*c12y*c13x2-3*c10y*c20x*c11y*c12y*c13x2+2*c10y*c20x*c12x*c12y2*c13x+2*c10y*c11y*c12x*c20y*c13x2+c11x*c20x*c11y*c12y2*c13x-3*c11x*c20x*c12x*c20y*c13y2-2*c10x*c12x2*c20y*c12y*c13y-6*c10y*c20x*c20y*c13x2*c13y-2*c10y*c20x*c12x2*c12y*c13y-2*c10y*c11x2*c11y*c13x*c13y-c10y*c11x2*c12x*c12y*c13y-2*c10y*c12x2*c20y*c12y*c13x-2*c11x*c20x*c11y2*c13x*c13y-c11x*c11y*c12x2*c20y*c13y+3*c20x*c11y*c20y*c12y*c13x2-2*c20x*c12x*c20y*c12y2*c13x-c20x*c11y2*c12x*c12y*c13x+3*c10y2*c11x*c12x*c13x*c13y+3*c11x*c12x*c20y2*c13x*c13y+2*c20x*c12x2*c20y*c12y*c13y-3*c10x2*c11y*c12y*c13x*c13y+2*c11x2*c11y*c20y*c13x*c13y+c11x2*c12x*c20y*c12y*c13y-3*c20x2*c11y*c12y*c13x*c13y-c10x3*c13y3+c10y3*c13x3+c20x3*c13y3-c20y3*c13x3-3*c10x*c20x2*c13y3-c10x*c11y3*c13x2+3*c10x2*c20x*c13y3+c10y*c11x3*c13y2+3*c10y*c20y2*c13x3+c20x*c11y3*c13x2+c10x2*c12y3*c13x-3*c10y2*c20y*c13x3-c10y2*c12x3*c13y+c20x2*c12y3*c13x-c11x3*c20y*c13y2-c12x3*c20y2*c13y-c10x*c11x2*c11y*c13y2+c10y*c11x*c11y2*c13x2-3*c10x*c10y2*c13x2*c13y-c10x*c11y2*c12x2*c13y+c10y*c11x2*c12y2*c13x-c11x*c11y2*c20y*c13x2+3*c10x2*c10y*c13x*c13y2+c10x2*c11x*c12y*c13y2+2*c10x2*c11y*c12x*c13y2-2*c10y2*c11x*c12y*c13x2-c10y2*c11y*c12x*c13x2+c11x2*c20x*c11y*c13y2-3*c10x*c20y2*c13x2*c13y+3*c10y*c20x2*c13x*c13y2+c11x*c20x2*c12y*c13y2-2*c11x*c20y2*c12y*c13x2+c20x*c11y2*c12x2*c13y-c11y*c12x*c20y2*c13x2-c10x2*c12x*c12y2*c13y-3*c10x2*c20y*c13x*c13y2+3*c10y2*c20x*c13x2*c13y+c10y2*c12x2*c12y*c13x-c11x2*c20y*c12y2*c13x+2*c20x2*c11y*c12x*c13y2+3*c20x*c20y2*c13x2*c13y-c20x2*c12x*c12y2*c13y-3*c20x2*c20y*c13x*c13y2+c12x2*c20y2*c12y*c13x]);
		
		var TOLERANCE=1e-4;
		var roots = poly.getRootsInInterval(0,1);
		
		for( var i = 0; i < roots.length; i++ )
		{
			var s = roots[i];
			
			var xRoots = new qlib.Polynomial([c13x,c12x,c11x,c10x-c20x-s*c21x-s*s*c22x-s*s*s*c23x]).getRoots();
			var yRoots = new qlib.Polynomial([c13y,c12y,c11y,c10y-c20y-s*c21y-s*s*c22y-s*s*s*c23y]).getRoots();
			
			if( xRoots.length > 0 && yRoots.length > 0 )
			{
			
				checkRoots:
				for( var j = 0; j < xRoots.length; j++ )
				{
					var xRoot = xRoots[j];
					if( 0 <= xRoot && xRoot <= 1 )
					{
						for( var k = 0; k < yRoots.length; k++ )
						{
							if( Math.abs(xRoot-yRoots[k]) < TOLERANCE)
							{
								this.appendPoint( new qlib.Vector2(c23x*s*s*s+c22x*s*s+c21x*s+c20x,c23y*s*s*s+c22y*s*s+c21y*s+c20y));
								break checkRoots;
							}
						}
					}
				}
				
			}
			
		}
		
		if( this.points.length > 0 ) this.status = qlib.Intersection.INTERSECTION;
		return this;
	};
	
	
	 p.bezier3_line = function(b, l)
	 { 
		 var dy = l.p1.y-l.p2.y;
		 var dx = l.p2.x-l.p1.x;
		 var c3 = dy*(-b.p1.x+3*(b.c1.x-b.c2.x)+b.p2.x)+dx*(-b.p1.y+3*(b.c1.y-b.c2.y)+b.p2.y);
		 var c2 = dy*3*(b.p1.x-2*b.c1.x+b.c2.x)+dx*3*(b.p1.y-2*b.c1.y+b.c2.y);
		 var c1 = dy*3*(b.c1.x-b.p1.x)+dx*3*(b.c1.y-b.p1.y);
		 var c0 = dy*b.p1.x+dx*b.p1.y+l.p1.x*l.p2.y-l.p2.x*l.p1.y;
		 
		 var pN = [];
			
		 var bb = c2/c3;
		 var c = c1/c3;
		 var d = c0/c3;
		 var p = c-bb*bb/3
		 var p3 = p*p*p/27;
		 var q = 2*bb*bb*bb/27-bb*c/3+d
		 var q2 = -q/2;
		 var dis = q2*q2+p3;
		 
		 if (dis>0)
		 { 
			 var dd = Math.sqrt(dis);
			 var ud = q2+dd;
			 var u = ud<0 ? -Math.pow(-ud, 1/3) : Math.pow(ud, 1/3);
			 var vd = q2-dd;
			 var v = vd<0 ? -Math.pow(-vd, 1/3) : Math.pow(vd, 1/3);
			 pN.push( (u+v)-bb/3 );
		 } else if (dis == 0)
		 { 
			if (!p && !q) 
				pN[0] = -bb/3;
			else
			{ 
			 pN.push( Math.pow(-4*q, 1/3)-bb/3 );
			 pN.push( Math.pow(q/2, 1/3)-bb/3);
			}
		} else if (dis<0)
		{ 
			 var a = Math.acos(q2/Math.sqrt(-p3))/3;
			 var p2 = 2*Math.sqrt(-p/3);
			 pN.push( p2*Math.cos(a)-bb/3);
			 pN.push( p2*Math.cos(a+Math.PI*2/3)-bb/3);
			 pN.push( p2*Math.cos(a-Math.PI*2/3)-bb/3);
		}
		 
		 var t;
		 var minmax = false;
		 while ( (t = pN.pop()) != null )
		 { 
			 if (t>=0 && t<=1)
			 { 
				if ( !minmax)
				{
					var minx = Math.min(l.p1.x,l.p2.x);
					var miny = Math.min(l.p1.y,l.p2.y);
					var maxx = Math.max(l.p1.x,l.p2.x);
					var maxy = Math.max(l.p1.y,l.p2.y);
					minmax = true;
				}
			 
				 var b4x = b.p1.x+t*(b.c1.x-b.p1.x);
				 var b5x = b.c1.x+t*(b.c2.x-b.c1.x);
				 var b7x = b4x+t*(b5x-b4x);
				 var b6x = b.c2.x+t*(b.p2.x-b.c2.x);
				 var b8x = b5x+t*(b6x-b5x);
				 var b9x = b7x+t*(b8x-b7x);
				 if (b9x>=minx &&  b9x<=maxx)
				 {
					 var b4y = b.p1.y+t*(b.c1.y-b.p1.y);
					 var b5y = b.c1.y+t*(b.c2.y-b.c1.y);
					 var b6y = b.c2.y+t*(b.p2.y-b.c2.y);
					 var b7y = b4y+t*(b5y-b4y);
					 var b8y = b5y+t*(b6y-b5y);
					 var b9y = b7y+t*(b8y-b7y);
					 if (b9y>=miny && b9y<=maxy) this.appendPoint(new qlib.Vector2(b9x,b9y));
				 }
			 } 
		 }
		 
		 if ( this.points.length > 0 ) this.status = qlib.Intersection.INTERSECTION;
		 return this;
	 } 
	
	p.line_line = function( l1, l2)
	{
		var d1 = l1.p1.y-l2.p1.y;
		var d2 = l1.p1.x-l2.p1.x;
		var d3 = l2.p2.x-l2.p1.x;
		var d4 = l2.p2.y-l2.p1.y;
		var d5 = l1.p2.x-l1.p1.x;
		var d6 = l1.p2.y-l1.p1.y;
		
		var ua_t = d3 * d1 - d4 * d2;
		var ub_t = d5 * d1 - d6 * d2;
		var u_b  = d4 * d5 - d3 * d6;
		
		if (u_b != 0) 
		{
			var ua = ua_t / u_b;
			var ub = ub_t / u_b;
			if (0<=ua && ua<=1 && 0<=ub && ub<=1) 
			{
				this.points[0] = new qlib.Vector2( l1.p1.x + ua * d5, l1.p1.y + ua * d6 );
				this.status = qlib.Intersection.INTERSECTION;
			} 
		} else {
			if (ua_t == 0 || ub_t == 0) {
				this.status = qlib.Intersection.COINCIDENT;
			} else {
				this.status = qlib.Intersection.PARALLEL;
			}
		}
		return this;
	};
	
	p.line_polygon = function( l, p )
	{
		var intersection;
		for ( var i = 0; i < p.pointCount; i++ )
		{
			intersection = l.intersect( p.getSide( i ) );
			if ( intersection.status == qlib.Intersection.INTERSECTION )
			{
				this.status = qlib.Intersection.INTERSECTION;
				this.appendPoint( intersection.points[0] );
			} else if ( this.status == qlib.Intersection.NO_INTERSECTION )
			{
				this.status = intersection.status;
			}
		}
		return this;
	}
	
	p.line_triangle = function( l, t )
	{
		var intersection;
		
		for ( var i = 0; i < 3; i++ )
		{
			intersection = l.intersect( t.getSide( i ) );
			if ( intersection.status == qlib.Intersection.INTERSECTION )
			{
				this.status = qlib.Intersection.INTERSECTION;
				this.appendPoint( intersection.points[0] );
			} else if ( this.status == qlib.Intersection.NO_INTERSECTION )
			{
				this.status = intersection.status;
			}
		}
		return this;
	}
	
	
	p.line_mixedPath = function( l, p )
	{
		/*
		var bounds = qlib.Polygon.fromRectangle( p.getBoundingRect( true ) );
		var quickTest = bounds.intersect( l );
		if ( quickTest.status == qlib.Intersection.NO_INTERSECTION )
		{
			this.status =  quickTest.status;
			return this;
		}
		*/
		var intersection;
		for ( var i = 0; i < p.segmentCount; i++ )
		{
			intersection = l.intersect( p.getSegment( i ) );
			if ( intersection.status == qlib.Intersection.INTERSECTION )
			{
				for ( var j = 0; j < intersection.points.length; j++ )
				{
					this.appendPoint( intersection.points[j]);
				}
			} 
		}
		if (this.points.length>0 ) this.status = qlib.Intersection.INTERSECTION;
		return this;
	}
	
	p.line_linearPath = function( l, p )
	{
		
		var bounds = qlib.Polygon.fromRectangle( p.getBoundingRect( true ) );
		var quickTest = bounds.intersect( l );
		if ( quickTest.status == qlib.Intersection.NO_INTERSECTION )
		{
			this.status =  quickTest.status;
			return this;
		}
		
		var intersection;
		for ( var i = 0; i < p.segmentCount; i++ )
		{
			intersection = l.intersect( p.getSegment( i ) );
			if ( intersection.status == qlib.Intersection.INTERSECTION )
			{
				for ( var j = 0; j < intersection.points.length; j++ )
				{
					this.appendPoint( intersection.points[j]);
				}
			} 
		}
		if (this.points.length>0 ) this.status = qlib.Intersection.INTERSECTION;
		return this;
	}
	
	
	p.bezier2_mixedPath = function( b, p )
	{
		var intersection;
		for ( var i = 0; i < p.segmentCount; i++ )
		{
			intersection = b.intersect( p.getSegment( i ) );
			if ( intersection.status == qlib.Intersection.INTERSECTION )
			{
				this.status = qlib.Intersection.INTERSECTION;
				for ( var j = 0; j < intersection.points.length; j++ )
				{
					this.appendPoint( intersection.points[j]);
				}
			} else if ( this.status == qlib.Intersection.NO_INTERSECTION )
			{
				this.status = intersection.status;
			}
		}
		return this;
	}
	
	p.bezier3_mixedPath = function( b, p )
	{
		var intersection;
		for ( var i = 0; i < p.segmentCount; i++ )
		{
			intersection = b.intersect( p.getSegment( i ) );
			if ( intersection.status == qlib.Intersection.INTERSECTION )
			{
				this.status = qlib.Intersection.INTERSECTION;
				for ( var j = 0; j < intersection.points.length; j++ )
				{
					this.appendPoint( intersection.points[j]);
				}
			} else if ( this.status == qlib.Intersection.NO_INTERSECTION )
			{
				this.status = intersection.status;
			}
		}
		return this;
	}
	
	p.bezier2_line = function( bz, l )
	{ 
		var min = l.p1.getMin(l.p2);
		var max = l.p1.getMax(l.p2);
		
		var c2x = bz.p1.x -2 * bz.c.x + bz.p2.x;
		var c2y = bz.p1.y -2 * bz.c.y + bz.p2.y;
		
		var c1x = -2 * bz.p1.x + 2 * bz.c.x;
		var c1y = -2 * bz.p1.y + 2 * bz.c.y;
		
		var c0x = bz.p1.x;
		var c0y = bz.p1.y;
		
		var nx = l.p1.y - l.p2.y;
		var ny = l.p2.x - l.p1.x;
		
		var cl = l.p1.x * l.p2.y - l.p2.x * l.p1.y;
		
		var roots = new qlib.Polynomial([nx * c2x + ny * c2y,nx * c1x + ny * c1y,nx * c0x + ny * c0y + cl]).getRoots();
		
		/*
		var pN:Vector.<Number> = new Vector.<Number>();
		var p:Number = -c1/c2/2;
		var d:Number = p*p-c0/c2;
		if (d == 0) pN.push( p );
		else if (d>0)
		{ 
			d = Math.sqrt(d);
			pN.push(p-d,p+d);
		}
		*/
		var t;
		while ( ( t = roots.pop())!=null)
		{
			if (t>=0 && t<=1)
			{ 
				var b3x = bz.p1.x + t * ( bz.c.x - bz.p1.x )
				var b3y = bz.p1.y + t * ( bz.c.y - bz.p1.y );
				
				var b4x = bz.c.x + t * ( bz.p2.x - bz.c.x)
				var b4y = bz.c.y + t * ( bz.p2.y - bz.c.y);
				
				var b5x = b3x + t *( b4x - b3x );
				var b5y = b3y + t *( b4y - b3y );
				
				
				if(l.p1.x == l.p2.x)
				{
					if( min.y <= b5y && b5y <= max.y)
					{
						this.appendPoint(new qlib.Vector2(b5x,b5y));
					}
				}else if( l.p1.y == l.p1.y )
				{
					if( min.x <= b5x && b5x <= max.x )
					{
						this.appendPoint(new qlib.Vector2(b5x,b5y));
					}
				} else if( b5x>=min.x && b5x<=max.x && b5y>=min.y && b5y<=max.y)
				{
					this.appendPoint(new qlib.Vector2(b5x,b5y));
				}
			}
		}
		if ( this.points.length >0 ) this.status = Intersection.INTERSECTION;
		return this;
	}
			
	p.draw = function( g, radius )
	{
		for ( var i = 0; i < this.points.length; i++ )
		{
			this.points[i].draw(g, radius);
		}
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "Intersection: "+this.status;
	}
	
	qlib["Intersection"] = Intersection;
}());